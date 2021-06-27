const jwt = require('jsonwebtoken')

const {EmailValidator, PasswordValidator, Claims, CapitalizeFirstLetter, HashPasswordAndCreateUser} = require('../util/util')
const config = require('../config/config')
const {User} = require('../config/dbConfig')

module.exports = {
    
        Registeration: function registeration(req, res) {

            let {email, password} = req.body
            
            if(EmailValidator(email) && PasswordValidator(password)) {                
                CapitalizeFirstLetter()
                return jwt.sign(Claims([req.params.role.capitalizeFirstLetter()]), config.secret, {expiresIn: config.expirationTime}, async function(err, token) {
                    if(err){
                        return res.status(500).send()
                    }

                    let {roles, permissions} = Claims([req.params.role.capitalizeFirstLetter()])
                    let userModel = {email, password, roles, permissions}
                    
                    async function cb({email, password, roles, permissions}={}) {
                                
                        // creating user model
                        try{
                            await User.create({
                                email, password, roles, permissions 
                            })
                            return res.status(200).send(token)
                        } catch(e) {
                            return res.status(500).send('Something went wrong')
                        }
                    } 

                    // hash password and create user model
                    try{
                        HashPasswordAndCreateUser(userModel, cb)
                    } catch(e) {
                        console.log(e);
                        return res.status(500).send('Something went wrong. try again later.')
                    }
                })
            }
            
            return res.status(401).send(JSON.stringify('Invalid credentials'));
        }       
}
