const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var morgan          = require('morgan');

const app           = express();
const port          = 4000;

/**
 * MODELS
 */
const User = require('./app/models/user');

 /**
 * ROUTES
 */
var coreRoutes = require('./app/routes/_core');
var authRoutes = require('./app/routes/auth');
var usersRoutes = require('./app/routes/user');


/**
 * Each request goes
 * 1. Check user token
 * 2. Check user permission
 * 3. Return result
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


/**
 * Вызывается в каждом HTTP запросе
 */
app.use('*', coreRoutes);


// ############################ PERMISSIONS ############################    
app.use('/users/add', permit("user", "admin"));
app.use([ '/users/update/:id', '/users/delete/:id'], permit("admin"));


// ############################ PUBLIC API ############################    
app.use('/users', usersRoutes);
app.use('/authenticate', authRoutes);

                 
/**
 * App: Start
 */
app.listen(port, (error) => {
    
    if(error){
        console.error(error);
    }

    
    // Connect to Database
    mongoose.connect('mongodb://localhost:27017/test', {}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Example app listening on port ${port}!`);
    });

});
    

function permit(...allowed){
    
        
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {        
        console.log('Second');

        if( req.user && req.user.role && isAllowed(req.user.role)){
            next();
        }else{
            res.status(403).json({message: "Forbidden"}); // user is forbidden
        }        
    }
    
}