const mongoose = require('mongoose')
if (process.env.NODE_ENV === 'development') require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Database connection successful.'))