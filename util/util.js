const config = require('../config/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
 
module.exports = {

    EmailValidator: function emailValidatorUtility(email="") {
        const regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
        return regExpEmail.test(email)
    },

    PasswordValidator: function passwordValidatorUtility(password="") {
        const regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
        return regExpPassword.test(password)
    },

    Claims: function claims(email='', roles=[]) {
        let permissions = []
        for(let role of roles) {
            if(role == config.instructor) {
                permissions.push(...[config.read, config.write])
            }
            else if(role == config.student) {
                permissions.push(...[config.read, config.write])
            }
        }
        return {email, roles, permissions, iat: Math.floor(Date.now() / 1000) - 30}
    },

    CapitalizeFirstLetter: function capitalizeFirstLetter() {
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1)
        }
    },

    ExtractToken: function extractToken(bearerToken) {
        return bearerToken.replace(config.prefix, '').trim()
    },

    GetPayload: function getPayload(bearerToken) {   
        return jwt.decode(this.ExtractToken(bearerToken))
    },

    HashPasswordAndCreateUser: function hashPasswordAndCreateUser( {email, password, roles, permissions}, cb) {
        try{
            return bcrypt.hash(password, config.saltRounds, function(err, hash) {
                if(err){
                    return new Error('Something went wrong!')
                }
                else{
                    return cb({email, password: hash, roles, permissions})
                }
            })
        } catch(e){
            throw new Error(e)
        }
    },

    ComparePasswordAndReturnToken: function comparePasswordAndReturnToken( {email, password, hashedPassword, roles} , cb, res) {
        try{
            return bcrypt.compare(password, hashedPassword,function(err, result) {
                if(err) {
                    res.status(500).send()
                }
                if(result) {
                    cb(email, roles)
                }
                else{
                    res.status(403).send(JSON.stringify({message: 'Password Mismatch'}))
                }
            })
        } catch(e) {
            console.log(e.message)
            res.status(500).send()
        }
    }
}