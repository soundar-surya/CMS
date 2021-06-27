const jwt = require('jsonwebtoken')

const config = require('../config/config')
const utilities = require('../util/util')

module.exports = {
    
    RequireAuthentication : function requireAuthentication(req, res, next) {
        
        let {authorization:token=''} = req.headers
        if(token.valueOf() == '') {
            return res.status(401).send(JSON.stringify('Invalid Token'))
        }
        try{
            jwt.verify(utilities.ExtractToken(token), config.secret, function(err, decoded) {
                if(err) {
                    console.log(err);
                    return res.status(401).send(JSON.stringify('Token Expired'))
                }
                next()
            })
        }
        catch(e){
            console.log(e);
           res.status(500).send()
        }
    }
}