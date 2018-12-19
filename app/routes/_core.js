const express  = require('express');
const mongoose = require('mongoose');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User     = require('../models/user');
const router   = express.Router();


router.all('*',(req, res, next) => {

    console.log('First');

    var token = req.headers['authorization'];

    if( token ){

        // verifies secret and checks exp
        jwt.verify( token, 'Arabtili.kz', (err, decoded)=>{

            if (err) {                
                res.status(401).json({ message: 'Your access token is expired. Please sign in again.' })
            }else{                
                req.user = decoded;
                next();            
            }            
        });                
    }else{
        res.status(401).json({ message: 'You are not authorized.' })
    }
});

module.exports = router;