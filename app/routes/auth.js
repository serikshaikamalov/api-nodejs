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

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }

        // Check: if password matches
        if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }

        

        console.log('User before:', user);

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
    });



});


module.exports = router;