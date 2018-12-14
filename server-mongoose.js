const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const cors          = require('cors');

const app           = express();
const port          = 4000;

 /**
 * ROUTES
 */
var coreRoutes = require('./app/routes/_core');
var authRoutes = require('./app/routes/auth');
var usersRoutes = require('./app/routes/user');


/**
 * Each request goes
 * 1. Middleware: Check user token
 * 2. Middleware: Check user permission
 * 3. Middleware: Return result
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


/**
 * Middleware: Only one middleware is allowed. It is authenticate
 */
app.use('/authenticate', authRoutes);

/**
 * Middleware: Validate for user token exist and expired
 */
app.use('*', coreRoutes);

/**
 * Middleware: Validate user permissition
 */
app.use('*', permit("admin"));


/**
 * Middleware: Resource
 */
app.use('/users', usersRoutes);

                 
/**
 * App: Start
 */
app.listen(port, (error) => {
    
    if(error) console.error(error);    
        
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
            res.status(403).json({message: "You dont have permission!"});
        }        
    }
    
}