const {Registeration} = require('../service/registrationService')
const {RequireAuthentication} = require('../service/validationService')
const {InstructorOnlyFilter, RegisterationFilter} = require('../service/filters')
const {Sequelize} = require('sequelize')

module.exports =  function controller(app) {
    
    app.get('/',RequireAuthentication, InstructorOnlyFilter, function (req, res) {
        res.send('Class Management System.')
    })

    app.post('/registeration/:role', RegisterationFilter, Registeration)
    
    app.post('/test', async (req,res) => {

        const {username, password} = req.body
        console.log(username)
        const sequelize = new Sequelize('postgres://csablalb:DG6-_0Zn4ZI3AeCTmGFcHDwSqGZWunYT@batyr.db.elephantsql.com/csablalb')
        var Posts;
        const User = sequelize.authenticate().then(() => {
            console.log("Success!");
            Posts = sequelize.define('posts', {
              title: {
                type: Sequelize.STRING
              },
              content: {
                type: Sequelize.STRING
              }
            }, {
              freezeTableName: true
            });
          
            Posts.sync({force: false}).then(function () {
              return Posts.create({
                title: 'Getting Started with PostgreSQL and Sequelize',
                content: 'Hello there'
              });
            });
          }).then((() => {
            Posts.findAll({
                where: {
                  id: '1'
                }
               }).then((data) => {
                  let x = data.map(row => row.dataValues)
                  for(let i of x){
                      for(let j in i) {
                          console.log(i[j])
                      }
                  }
               }).catch((err) => {
                  console.log(err);
               });
          }))
          .catch((err) => {
            console.log(err);
          });

        res.send("success")
    })

}