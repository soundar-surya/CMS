const config = require('../config/config')
const jwt = require('jsonwebtoken')
 
module.exports = {

    EmailValidator: function emailValidatorUtility(email="") {
        const regExpEmail = /([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\@([A-Z]|[a-z]|[^<>()\[\]\\\/.,;:\s@"]){4,}\.(com|net)/;
        return regExpEmail.test(email)
    },

    PasswordValidator: function passwordValidatorUtility(password="") {
        const regExpPassword = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
        return regExpPassword.test(password)
    },

    Claims: function claims(roles=[]) {
        let permissions = []
        for(let role of roles) {
            if(role == config.instructor) {
                permissions.push(...[config.read, config.write])
            }
            else if(role == config.student) {
                permissions.push(...[config.read, config.write])
            }
        }
        return {roles, permissions, iat: Math.floor(Date.now() / 1000) - 30}
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

}