module.exports = express => {

    const fs = require('fs-extra'),
        path = require('path'),
        settings = require('./../lib/settings')

/*

bucket: 
    name
    secret


*/

    express.get('/file/:bucket/:path(*)', async (req, res) => {
        try {
            // ensure that bucket is allowed
            const bucket = req.params.bucket,
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

            // fail if file doesnt exist > make 404
            const storePath = path.join(settings.store, bucket, req.params.path)
            if (!await fs.exists(storePath))
                return res.end('file not found')


            res.setHeader('content-type', 'application/octet-stream')
            fs.createReadStream(storePath).pipe(res)
            
        } catch(ex){
            res.end(ex)
            console.log(ex)
        }
    })


    /**
     * 
     */
    express.post('/file/:bucket/:path(*)', async (req, res) => {
        try {

            if (!req.body)
                throw `body not set`

            // ensure that bucket is allowed
            const bucket = req.params.bucket,
                bucketConfig = settings.buckets[bucket]

            if (!bucketConfig)
                return res.end(`bucket ${bucket} not defined`)
            
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

            // fail if file exists
            const storePath = path.join(settings.store, bucket, req.params.path)
            if (await fs.exists(storePath))
                return res.end('file exists')

            const directoryPath = path.dirname(storePath)

            await fs.mkdir(directoryPath, { recursive: true });

            req.pipe(fs.createWriteStream(storePath, {flags:'a'})) 
            res.end('file written')

        } catch(ex){
            res.end(ex)
            console.log(ex)
        }
    })
    
}