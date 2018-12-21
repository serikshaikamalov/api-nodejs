const jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports.isUserAuthenticated = (req, res, next) => {
    
    // Get token from header
    var token = req.headers['authorization'];

    if( token ){

        // Verify token and its life
        jwt.verify( token, 'Arabtili.kz', (err, decoded)=>{

            // If token is expired
            if (err) {  
                res.status(401).json({ message: 'Your access token is expired. Please sign in again.' })
            }else{         
                       
                // Continue
                req.user = decoded;
                next();            
            }            
        });                
    }else{
        res.status(401).json({ message: 'You are not authorized.' })
    }
}