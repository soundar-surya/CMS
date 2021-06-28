const { Sequelize} = require('sequelize')

const {uri} = require('../config.json')
// const {uri} = require('./config')
const userModel = require('../models/user')
const eventModel = require('../models/event')
const registeredEventModel = require('../models/registeredEventsModel')

let Event
let User
let RegisteredEvents
let sequelize = new Sequelize(uri)

try{
    sequelize.authenticate()
    console.log("Dastabase connection Initaited");

    // schema
    User = userModel(sequelize, Sequelize)
    Event = eventModel(sequelize, Sequelize)
    RegisteredEvents = registeredEventModel(sequelize, Sequelize)
}
catch(e){
    console.log(e);
}
finally{
    // force: true - deletes the table if already exists 
    User.sync({force: false})
    Event.sync({force: false})
    RegisteredEvents.sync({force: false})
}

module.exports = {
    User,
    Event, 
    RegisteredEvents
}