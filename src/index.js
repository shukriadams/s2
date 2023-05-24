(async ()=>{

    let server,
        fs = require('fs-extra'),
        http = require('http'),
        Express = require('express'),
        bodyParser = require('body-parser'),
        handlebarsLoader = require('madscience-handlebarsloader'),
        settings = require('./lib/settings'),
        express = Express()
    
    // ensure/validate all the things
    await fs.ensureDir(settings.store)
    await fs.ensureDir(settings.logs)
    
    express.set('json spaces', 4)
    express.use(bodyParser.urlencoded({ }))
    express.use(bodyParser.json())

    // ready to start - load/start all the things
    const path = require('path'),
        routeFiles = await fs.readdir(path.join(__dirname, '/routes'))

    for (const routeFile of routeFiles){
        const routeFileName = routeFile.match(/(.*).js/).pop(),
            route = require(`./routes/${routeFileName}`)

        route(express)
    }

    // config
    handlebarsLoader.initialize({ 
        forceInitialize : !settings.cacheViews,
        helpers : `${__dirname}/../views/helpers`,
        pages : `${__dirname}/../views/pages`,
        partials : `${__dirname}/../views/partials`,
    })

    server = http.createServer(express)
    server.listen(settings.port)

    let status = `http-filestore : Listening on port ${settings.port}`
    console.log(status)

})()
