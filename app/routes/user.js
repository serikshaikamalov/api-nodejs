const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const router = express.Router();
const passport = require('passport');

const { ensureAuthenticated } = require('../helpers/auth');

/**
 * User: List
 */
router.get('/', ensureAuthenticated, (req, res, next) => {

    if( req.isAuthenticated() ){
        return next();
    }

    res.status(400).send({ 'message': 'not allowed' })


    console.log('Second');

    User.find({}, ( err, users )=>{
        
        if (err){
            res.status(400).json(err);
        }
        
        res.send(JSON.stringify(users));
    });

    
    
});


/**
 * User: Details
 */
router.route('/:id').get((req, res) => {

    const _id = req.params.id;
    console.log('User Id', _id);

    User.findOne({ _id }, (err, user)=>{
        res.send( user );
    });        
});


/**
 * User: Save
 */
router.route('/add').post((req, res, next) => {
    
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role
    });

    user.save( user, (err, result)=>{
        if(err) return console.log(err);
        res.send("Added new users");
    });
});

/**
 * User: Update
 */
router.route('/update/:id').post(( req, res )=>{
    
    const id = req.params.id;
    const query = { '_id': id };

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    console.log('User: ', user);

    User.update( query, user, (err, result) =>{
        if (err) {
            res.send({'error':'An error has occurred'});
        }

        res.send(user)
    });
    
});


/**
 * User: Delete
 */
router.route('/delete/:id').post((req, res)=>{
    const id = req.params.id;
    const query = { '_id': id };

    User.remove(query, ( err, result )=>{
        if( err ){
            res.send({'error':'An error has occurred'});
        }

        res.send('User ' + id + ' deleted!');
    })
});



module.exports = router;