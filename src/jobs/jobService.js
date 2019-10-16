if (process.env.NODE_ENV === 'development') require('dotenv').config()
const Prediccion = require('../models/Prediccion')
const SolarSystem = require('../models/SolarSystem')
const utils = require('../utils/utils')
const DAYS_TO_PREDICT = 1

mySolarSystem =  new SolarSystem()
exports.myJob = async () => {
    var periodosDeSequia = 0
    var periodosDeLluvia = 0
    var periodosOptimos = 0
    var maxDeLluvia = null
    var diaMaxDeLuvia = null
    var x = 0
    //flag= 1 -> Condiciones del día anterior = Lluvia
    //flag= 2 -> Condiciones del día anterior = Sequía
    //flag= 3 -> Condiciones del día anterior = Óptimo
    var flag = 0 
    var posArr = [[]]
    for (let i = 0; i < DAYS_TO_PREDICT; i++) {
        const myPrediccion = new Prediccion()
        myPrediccion.dia = i
        myPrediccion.clima = mySolarSystem.calculatePeriodCondition(i)

        posArr = [
            [mySolarSystem.ferengi.xCord, mySolarSystem.ferengi.yCord],
            [mySolarSystem.betasoide.xCord, mySolarSystem.betasoide.yCord],
            [mySolarSystem.vulcano.xCord, mySolarSystem.vulcano.yCord]
        ]

        if(myPrediccion.clima == 'Lluvia') myPrediccion.area = utils.calculateArea(posArr)
        else myPrediccion.area = undefined
        
        if (process.env.SAVE_JOB == 'true') await Prediccion.find({dia:myPrediccion.dia}, async (err,docs) =>{
            if(!docs.length){
                await myPrediccion.save((err, prediccion) => {
                    if (err) return console.error(`Error saving -> ${myPrediccion}, ${err}`)
                    else console.log(`asbfaipsndasdSaved ${myPrediccion}`)
                })
            }
        })

        
        switch (myPrediccion.clima) {
            case 'Lluvia':
                if(myPrediccion.area>maxDeLluvia){
                    maxDeLluvia = myPrediccion.area
                    diaMaxDeLuvia = i
                }
                if(flag != 1) periodosDeLluvia ++ 
                flag=1
                break

            case 'Sequia':
                if(flag != 2) periodosDeSequia ++ 
                flag=2
                break

            case 'Optimo':
                if(flag != 3) periodosOptimos ++ 
                flag=3
                break

            default:
                flag=0
        }
    }

    console.log(`Se pronostica para los próximos ${DAYS_TO_PREDICT} días:
    Periodos de sequía: ${periodosDeSequia}
    Periodos De Lluvia: ${periodosDeLluvia} con un máximo de caudal de lluvia ${maxDeLluvia } en el día ${diaMaxDeLuvia}
    Periodos Optimos: ${periodosOptimos }
     `)

}
