const config = require('../config/config')
const utilities = require('../util/util')

module.exports = {
    
    RegisterationFilter: function registerationFilter(req, res, next) {
        
        if(req.params.role == config.InstructorRole || req.params.role == config.studentRole) {
            next()
        }
        else{
            console.log(req.params.role);
            res.status(404).send()
        }
    },

    InstructorOnlyFilter: function instructorOnlyFilter(req, res, next) {
        
        let {authorization:token=''} = req.headers
        let {roles=[], permissions=[]} = utilities.GetPayload(token)

        if(roles.includes(config.instructor)) {
            next()
        }
        else {
            res.status(403).send(JSON.stringify({message: 'You are not allowed to access this endpoint'}))
        }
    },

    Authorizationfilter: function authorizationfilter(req, res, next) {
        let {authorization:token=''} = req.headers
        if(!token && token.length == 0) {
            res.status.send(403).send()
        }
        else{
            req.user = utilities.GetPayload(token)
            next()
        } 
    }

}