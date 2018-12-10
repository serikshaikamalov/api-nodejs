const express  = require('express');
const mongoose = require('mongoose');
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User     = require('../models/user');
const router   = express.Router();

/**
 * Вызывается в каждом HTTP запросе
 */
router.all('*',(req, res, next) => {

    console.log('First');

    var token = req.body.token;

    
    if( token ){

        // verifies secret and checks exp
        jwt.verify( token, 'Arabtili.kz', (err, decoded)=>{

            if (err) {

                console.log('Error', err);

                // res.json({ success: false, message: 'Failed to authenticate token.' })
            }

            console.log('Decoded: ', decoded);
            req.user = decoded;            
        });                
    }else{
        req.user = null;
    }

    next();
    
});

module.exports = router;