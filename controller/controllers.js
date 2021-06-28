const {Registeration} = require('../service/registrationService')
const {RequireAuthentication} = require('../service/validationService')
const {Login} = require('../service/loginService')
const {eventCreationService, eventModificationService, eventCancellationService, getAvailableEvents, eventRegisterationService, getRegisteredEvents} = require('../service/eventService')
const {InstructorOnlyFilter, RegisterationFilter, Authorizationfilter} = require('../service/filters')


module.exports =  function controller(app) {
    
    app.get('/',RequireAuthentication, InstructorOnlyFilter, function (req, res) {
        res.send('Class Management System.')
    })

    // registeration - role: either instructor or students is allowed
    app.post('/registeration/:role', RegisterationFilter, Registeration)
    
    // login
    app.post('/login', Login)

    // event / class creation
    app.post('/create/event', Authorizationfilter, InstructorOnlyFilter, eventCreationService)

    // modifying already created event / class
    app.put('/modify/event', Authorizationfilter, InstructorOnlyFilter,  eventModificationService)

    // event / class cancellation
    app.delete('/cancel/event', Authorizationfilter, InstructorOnlyFilter, eventCancellationService)

    // get event / class details
    app.get('/get/events', getAvailableEvents)

    // event registeration
    app.post('/register/event', Authorizationfilter, eventRegisterationService)

    // get registered events
    app.get('/get/registered-events', Authorizationfilter, getRegisteredEvents)
}
