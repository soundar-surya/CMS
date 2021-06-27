const {Registeration} = require('../service/registrationService')
const {RequireAuthentication} = require('../service/validationService')
const {Login} = require('../service/loginService')
const {InstructorOnlyFilter, RegisterationFilter, Authorizationfilter} = require('../service/filters')


module.exports =  function controller(app) {
    
    app.get('/',RequireAuthentication, InstructorOnlyFilter, function (req, res) {
        res.send('Class Management System.')
    })

    app.post('/registeration/:role', RegisterationFilter, Registeration)
    
    app.post('/login', Login)
    
}
