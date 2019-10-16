const SolarSystem = require('../models/SolarSystem');

mySolarSystem = new SolarSystem()

exports.predecirClima =  async (req,res) => {
        const dia = req.query.dia;
        const clima =  await mySolarSystem.calculatePeriodCondition(dia)
        res.status(200).json({dia,clima});
}