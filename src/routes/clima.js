const { Router } = require('express')
const router = Router()

const climaController = require('../controllers/climaController')
const validator = require('../middlewares/validator')

router.get('/clima', validator.validParams, climaController.predecirClima)

module.exports = router

