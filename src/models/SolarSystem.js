const Planet = require('./Planet')
const utils = require('../utils/utils')
const Prediccion = require('./Prediccion')
    
class SolarSystem{
    constructor(){
        this.ferengi = new Planet('Ferengi', 'Ferengis', -1, 500)
        this.betasoide = new Planet('Betasoide', 'Betasoides', -3, 2000)
        this.vulcano = new Planet('Vulcano', 'Vulcanos,', 5, 1000)
    }

    async calculatePeriodCondition(day){
        //Primero me fijo si lo tengo en la base
        const dia = await Prediccion.find({dia:day})
        if(dia.length>0){
            return dia[0].toObject().clima
        }else{
            const myPrediccion = new Prediccion()
            myPrediccion.dia=day



            this.ferengi.calculatePlanetXYCords(day)
            this.betasoide.calculatePlanetXYCords(day)
            this.vulcano.calculatePlanetXYCords(day)

            var posArr = [
                [this.ferengi.xCord, this.ferengi.yCord],
                [this.betasoide.xCord, this.betasoide.yCord],
                [this.vulcano.xCord, this.vulcano.yCord]
            ]

            if(utils.areAlignedWithCenter(posArr)) myPrediccion.clima = 'Sequia'
            else if (utils.areAligned(posArr)) myPrediccion.clima = 'Optimo'
            else if (utils.containCenter(posArr[0],posArr[1],posArr[2])){
                myPrediccion.clima = 'Lluvia'
                myPrediccion.area = utils.calculateArea(posArr)    
            }
            else myPrediccion.clima = 'Normal'

            myPrediccion.save((err, prediccion) => {
                        if (err) return console.error(`Error saving -> ${myPrediccion}, ${err}`)
                        else console.log(`Saved ${myPrediccion}`)
                    })
        return myPrediccion.clima

        }

    } 
}

module.exports = SolarSystem
