const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PrediccionSchema = new Schema(
  {
    dia: {type: Number, required: true},
    clima: {type: String, required: true},
    area:{type:Number, required: false}
  }
)

var PrediccionModel = mongoose.model('Prediccion', PrediccionSchema)

PrediccionSchema.pre('save', function (next) {
    var self = this
    PrediccionModel.find({dia : self.dia}, function (err, docs) {
        if (!docs.length){
            next()
        }else{                
            console.log('Dia exists: ',self.dia)
            next(new Error("Dia exists!"))
        }
    })
}) 

module.exports = PrediccionModel