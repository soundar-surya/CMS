const jwt = require('jsonwebtoken')

const {EmailValidator, PasswordValidator, Claims, CapitalizeFirstLetter, HashPasswordAndCreateUser, ComparePasswordAndReturnToken} = require('../util/util')
const {expirationTime} = require('../config/config')
const {secret} = require('../config.json')
const {User} = require('../config/dbConfig')

module.exports = {
    
        Login: async function login(req, res) {

            let {email, password} = req.body
                if(EmailValidator(email) && PasswordValidator(password)) {                
                    
                    try{
                        let isExist = await User.findOne({where: {email}})
                        
                        if(!isExist) {
                            res.status(401).send(JSON.stringify({message: `User doesn't exist or Invalid credentials`}))
                        }

                       var {dataValues:{email: usermail, password: hashedPassword, roles, permissions}={}} = await isExist
                    
                    } catch(e) {
                        res.status(500).send(JSON.stringify({message: 'Something went wrong'}))
                    }
                    
                    function cb(userEmail='', userRoles='') {
                       return jwt.sign(Claims(userEmail, userRoles), secret, {expiresIn: expirationTime}, function(err, token) {
                        if(err) {
                            res.status(500).send(JSON.stringify({message: 'Something went wrong.'}))
                        }    
                            res.status(200).send(token)
                       }) 
                    }
    
                    
                    
                    try{
                          ComparePasswordAndReturnToken({email, password, usermail, hashedPassword, roles, permissions}, cb, res)
                    } catch(e) {
                        res.status(500).send()
                    }
                }
                else{
                    res.status(401).send(JSON.stringify({message: 'Invalid credentials'}));
                }
        }       
}
