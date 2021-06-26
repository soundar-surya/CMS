const jwt = require('jsonwebtoken')
const { type } = require('os')

const utilities = require('../util/util')
const config = require('../config/config')


module.exports = {
    
        Registeration: function registeration(req, res) {

            const {email, password} = req.body
            
            if(utilities.EmailValidator(email) && utilities.PasswordValidator(password)) {                
                utilities.CapitalizeFirstLetter()
                return jwt.sign(utilities.Claims([req.params.role.capitalizeFirstLetter()]), config.secret, {expiresIn: 60}, function(err, token) {
                    if(err){
                        return res.status(500).send()
                    }
                    return res.status(200).send(token)
                })
            }
            
            return res.status(401).send(JSON.stringify('Invalid credentials'));
        }       
}
