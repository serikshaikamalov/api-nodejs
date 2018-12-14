const express  = require('express');
const User     = require('../models/user');
const router   = express.Router();
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens

/**
 * Autheticate user
 */
router.route('/').post( (req, res)=>{

    // Find User
    const query = {
        email: req.body.email            
    }

    User.findOne(query, (err, user)=>{

        if (err) throw err;

        if (user) {                    
            // Check: if password matches            
            if ( req.body.password && user.password != req.body.password) {
                res.status(400).json({ success: false, message: 'Authentication failed. Wrong password.' });
            }else{
                
                // Generate token and send to client
                var payload = {
                    email: user.email,
                    role: user.role          
                };
                    
        
                console.log('User:', user.role);
        
                var token = jwt.sign(payload,'Arabtili.kz',{
                    expiresIn: 86400 // seconds: 24 hour
                });
        
                res.json({
                    payload: payload,
                    token: token
                });
            }               
        }else{
            res.status(400).json({ message: 'Authentication failed. User not found.' });
        }
    });
});


module.exports = router;