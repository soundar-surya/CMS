const config = require('../config/config')
const utilities = require('../util/util')

module.exports = {
    
    RegisterationFilter: function registerationFilter(req, res, next) {
        
        if(req.params.role == config.InstructorRole || req.params.role == config.studentRole) {
            next()
        }
        else{
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
            res.status(403).send(JSON.stringify('You are not allowed to access this endpoint'))
        }
    }

}