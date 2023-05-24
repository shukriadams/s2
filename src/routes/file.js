module.exports = express => {

    const fs = require('fs-extra'),
        path = require('path')

    /**
     * 
     */
    express.post('/v1/file/:path', async (req, res) => {
        try {

            if (!req.body)
                throw `body not set`
            
            // ensure that path isn't trying to break out of storage path


            // check if file exists
            const storePath = path.join(settings.store, 'bucketname', path.baseename(req.param.path))
            const directoryPath = path.baseename(storePath)
            await fs.ensureDir(directoryPath)

            fs.writeFile(storePath, req.body)

            res.end('created')

        } catch(ex){
            console.log(ex)
        }
    })
    
}