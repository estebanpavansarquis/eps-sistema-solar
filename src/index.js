const app = require('./loaders/app')
const job = require('./jobs/jobService')
require('./loaders/database')

async function init(){
    await app.listen(process.env.PORT, err => {
        if (err) {
            console.log(err)
            return
        }
    })
    console.log(`App "${app.get('appName')}" listening on port ${process.env.PORT}.`) 
}

init()
job.myJob()