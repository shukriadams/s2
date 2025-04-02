module.exports = express => {

    const fs = require('fs-extra'),
        path = require('path'),
        settings = require('./../lib/settings')

    /*
    Lists files in a bucket

    bucket: 
        name
        secret
    */
    express.get('/list/:bucket', async (req, res) => {
        try {
            // ensure that bucket is allowed
            const bucket = req.params.bucket,
                fsUtils = require('madscience-fsUtils'),
                bucketConfig = settings.buckets[bucket]

            if (!bucketConfig)
                return res.end('bucket not defined')                
            
            // if bucket defines key, ensure key has been passed in header 
            if (bucketConfig.secret){
                let authPassed = false
                const header = req.headers.authorization || ''
                if (header){
                    const token = header.split(/\s+/).pop() || ''
                    if (token){
                        const tokenDecoded = Buffer.from(token, 'base64').toString()
                        if (token === bucketConfig.secret || tokenDecoded === bucketConfig.secret)
                            authPassed = true
                    }
                }

                if (!authPassed)
                    return res.end('auth fail')
            }
            
            let bucketPath = path.join(settings.store, bucket), 
                files = []

            if (await fs.exists(bucketPath))
                files = await fsUtils.readFilesUnderDir(bucketPath)

            // strip path down past bucket name, we don't need to expose this
            const rootLength = settings.store.split(path.sep).length
            for (let i = 0 ; i < files.length ; i ++)
                files[i] = files[i].split(path.sep).slice(rootLength).join(path.sep)

            res.json({
                items : files,
                page: 0,
                total : files.length
            })
            
        } catch(ex){
            res.end(ex.messsage)
            console.log(ex)
        }
    })
}