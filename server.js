const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const cors          = require('cors');
const passport      = require('passport');

const app           = express();
const port          = 4000;

 /**
 * ROUTES: CORE
 */
var coreRoutes  = require('./app/routes/_core');
var authRoutes  = require('./app/routes/auth');

/**
 * ROUTES: PUBLIC
 */
var publicRoutes = require('./app/routes/public/public.routes');

/**
 * ROUTES: PRIVATE
 */
var privateRoutes = require('./app/routes/private/private.routes');

/**
 * HELPERS
 */
var helpers = require('./app/helpers/helpers');

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
 * Middleware: Authorization
 * Local(Login, Registration)
 * VK(Auth)
 */
app.use('/auth', authRoutes);


/**
 * PUBLIC API
 * These api for client side
 */
app.use('/public', publicRoutes)

/**
 * PRIVATE API 
 */
app.use('/private', privateRoutes);


/**
 * Middleware: Validate for user authorization
 */
app.use('*', coreRoutes);

/**
 * Middleware: Validate user permissition
 */
app.use('*', helpers.permit("admin"));




                 
/**
 * App: Start
 */
app.listen(port, (error) => {
    
    if(error) console.error(error);    
            
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useCreateIndex: true}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Example app listening on port ${port}!`);
    });
});