const express  = require('express');
const mongoose = require('mongoose');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User     = require('../models/user');
const router   = express.Router();
const passport = require('passport');

/**
 * Autheticate user
 */
router.route('/').post( (req, res)=>{

    // passport.authenticate('local');


    // Find User
    const query = {
        email: req.body.email            
    }

    User.findOne(query, (err, user)=>{

        if (err) throw err;

        if (user) {
            
        

        // Check: if password matches

        console.log('params:', req.body);
        console.log('user:', user);

        if ( req.body.password && user.password != req.body.password) {
            res.status(400).send({ success: false, message: 'Authentication failed. Wrong password.' });
        }else{
            
            // Generate token and send to client
            var payload = {
                email: user.email,
                role: user.role          
            };
                
    
            console.log('User:', user.role);
    
            var token = jwt.sign(payload,'Arabtili.kz',{
                expiresIn: 1440 // seconds
            });
    
            res.json({
                payload: payload,
                token: token
            });
        }

        

       
        }else{
            res.status(400).send({ message: 'Authentication failed. User not found.' });
        }
    });



});


module.exports = router;