const express = require('express')
const bodyParser = require('body-parser')
const { Sequelize} = require('sequelize')

// app config
const app = express()
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//db config
async function dBConfig() {
    const sequelize = new Sequelize('postgres://csablalb:DG6-_0Zn4ZI3AeCTmGFcHDwSqGZWunYT@batyr.db.elephantsql.com/csablalb')
    try{
        await sequelize.authenticate()
        console.log("connection to database successful");
    }
    catch(e){
        console.log(e);
    }
}
dBConfig()

// controllers
const controller = require('./controller/controllers')

// routes
controller(app)

// server config
const PORT = process.env.PORT || 5000
app.listen(PORT, function() {
    console.log(`server listening at ${PORT}`)
})