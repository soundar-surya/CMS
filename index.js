const express = require('express')
const bodyParser = require('body-parser')

// app config
const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//db config
require('./config/dbConfig')

// controllers
const controller = require('./controller/controllers')

// routes
controller(app)

// server config
const PORT = process.env.PORT || 5000
app.listen(PORT, function() {
    console.log(`server listening at ${PORT}`)
})
