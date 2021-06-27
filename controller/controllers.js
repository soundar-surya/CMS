const { Sequelize } = require("sequelize")

const {Registeration} = require('../service/registrationService')
const {RequireAuthentication} = require('../service/validationService')
const {InstructorOnlyFilter, RegisterationFilter} = require('../service/filters')


module.exports =  function controller(app) {
    
    app.get('/',RequireAuthentication, InstructorOnlyFilter, function (req, res) {
        res.send('Class Management System.')
    })

    app.post('/registeration/:role', RegisterationFilter, Registeration)
    
    app.post('/test', async (req,res) => {

        const {email, password} = req.body
        // console.log(username)

        //const user = await 

        // await User.sync({force: false}).then(function() {
        //     return User.create({
        //         email,
        //         password,
        //         role: 'admin'
        //     })
        // })

        

        res.send('sucess')

    })
    
}

            // Posts.sync({force: false}).then(function () {
            //   return Posts.create({
            //     title: 'Getting Started with PostgreSQL and Sequelize',
            //     content: 'Hello there'
            //   });
            // });
          
