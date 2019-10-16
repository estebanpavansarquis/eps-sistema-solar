const express = require('express')
const morgan = require('morgan')

var app = express()
var indexRouter = require('../routes/index')
var climaRouter = require('../routes/clima')

app.set('appName','Sistema Solar')

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(climaRouter)
app.use(indexRouter)

module.exports = app


