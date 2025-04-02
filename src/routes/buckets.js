
module.exports = express => {

    express.get('/buckets', async (req, res)=>{
        try  {
            const handlebarsLoader = require('madscience-handlebarsloader'),
                settings = require('./../lib/settings'),
                view = await handlebarsLoader.getPage('buckets'),
                model = {
                    name : settings.name,
                    buckets : []
                }

            // remove hidden buckets
            for (bucket in settings.buckets)
                if (settings.buckets[bucket].visible)
                    model.buckets.push(bucket)

            res.send(view(model))
        } 
        catch(ex)
        {
            console.log(ex)
            res.end('error - check logs')
        }
    })

}