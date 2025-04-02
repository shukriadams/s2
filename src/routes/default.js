
module.exports = express => {

    express.get('/', async (req, res)=>{
        try  {
            const handlebarsLoader = require('madscience-handlebarsloader'),
                settings = require('./../lib/settings'),
                view = await handlebarsLoader.getPage('default'),

            model = {
                name : settings.name
            }

            res.send(view(model))
        } 
        catch(ex)
        {
            console.log(ex)
            res.end('error - check logs')
        }
    })

}