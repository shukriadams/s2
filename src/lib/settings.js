

let settings = null


if (settings === null){
    const yaml = require('js-yaml'),
        fs = require('fs'),
        settingsPath = process.env.SETTINGS_PATH || './config.yml'

    if (fs.existsSync(settingsPath)){
        console.log(`Loading settings from ${settingsPath}`)
        try {
            let settingsYML = fs.readFileSync(settingsPath, 'utf8')
            settings = yaml.safeLoad(settingsYML)
        } catch (e) {
            console.log('Error reading settings.yml', e)
            throw e
        }
    } 

    settings = Object.assign({
        port: 4060,
        store : './data/store',
        logs: './data/logs',
        buckets : {}
    }, settings)

    
    for (const bucketName in settings.buckets){

        settings.buckets[bucketName] = Object.assign({
            name: bucketName,
            secret : null            
        }, settings.buckets[bucketName])
    }
}

module.exports = settings