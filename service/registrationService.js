const jwt = require('jsonwebtoken')

const {EmailValidator, PasswordValidator, Claims, CapitalizeFirstLetter, HashPasswordAndCreateUser} = require('../util/util')
const {expirationTime} = require('../config/config')
const {secret} = require('../config.json')
const {User} = require('../config/dbConfig')

module.exports = {
    
        Registeration: function registeration(req, res) {

            let {email, password} = req.body
            
            if(EmailValidator(email) && PasswordValidator(password)) {                
                CapitalizeFirstLetter()
                return jwt.sign(Claims(email, [req.params.role.capitalizeFirstLetter()]), secret, {expiresIn: expirationTime}, async function(err, token) {
                    if(err){
                        res.status(500).send()
                    }

                    let {roles, permissions} = Claims(email, [req.params.role.capitalizeFirstLetter()])
                    let userModel = {email, password, roles, permissions}
                    
                    async function cb({email, password, roles, permissions}={}) {
                                
                        // check whether the user already exist
                        try{
                            let isExist = await User.findOne({where: {email}})
                            if(isExist) {
                                res.status(401).send(JSON.stringify({message: 'User already exist.'}))
                                res.end()
                            }

                            else{
                                 // unless, create new user 
                                try{
                                    await User.create({
                                        email, password, roles, permissions 
                                        })
                                }
                                catch(e) {
                                    res.status(500).send()
                                }
                                                            
                                    // send token in response
                                    res.status(200).send(token)
                            }

                        } catch(e) {   
                            res.status(500).send(JSON.stringify({message: 'Something went wrong'}))
                        }
                    } 

                    // hash password and create user model
                    try{
                        HashPasswordAndCreateUser(userModel, cb)
                    } catch(e) {
                        res.status(500).send(JSON.stringify({message: 'Something went wrong. try again later.'}))
                    }
                })
            }
            
            // return 401 , if the credentials are wrong
            res.status(401).send(JSON.stringify({message: 'Invalid credentials'}))
        }       
}
