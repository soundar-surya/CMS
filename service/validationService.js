const jwt = require('jsonwebtoken')

const {secret} = require('../config.json')
const {ExtractToken} = require('../util/util')

module.exports = {
    
    RequireAuthentication : function requireAuthentication(req, res, next) {
        
        let {authorization:token=''} = req.headers
        if(token.valueOf() == '') {
            return res.status(401).send(JSON.stringify({message: 'Invalid Token'}))
        }
        try{
            jwt.verify(ExtractToken(token), secret, function(err, decoded) {
                if(err) {
                    console.log(err);
                    res.status(401).send(JSON.stringify({message: 'Token Expired'}))
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