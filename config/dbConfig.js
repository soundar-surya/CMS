const { Sequelize} = require('sequelize')

const {uri} = require('./config')
const userModel = require('../models/user')


let sequelize = new Sequelize(uri)
try{
    sequelize.authenticate()
    console.log("Dastabase connection Initaited");
}
catch(e){
    console.log(e);
}
finally{
    userModel(sequelize, Sequelize).sync({force: false})
    let User = userModel(sequelize, Sequelize)
}

module.exports = {
    User: userModel(sequelize, Sequelize)
}