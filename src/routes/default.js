module.exports = express => {

    express.get('/', async (req, res)=>{
        return res.end('http-filestore')
    })
}