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
var coreRoutes  = require('./app/routes/_core');
var authRoutes  = require('./app/routes/auth');
var usersRoutes = require('./app/routes/user');
var vkRoutes    = require('./app/routes/social/vk');

/**
 * PUBLIC ROUTES
 */
var publicUsersRoutes = require('./app/routes/public/public.routes');


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
 * Middleware: Only one middleware is allowed. It is authenticate
 */
app.use('/auth', authRoutes);

/**
 * Middleware: Auth VK
 */
app.use('/vk', vkRoutes)

/**
 * PUBLIC API
 * These api for client side
 */
app.use('/public', publicUsersRoutes)

/**
 * Middleware: Validate for user authorization
 */
app.use('*', coreRoutes);

/**
 * Middleware: Validate user permissition
 */
app.use('*', helpers.permit("admin"));


/**
 * Middleware: Resource
 */
app.use('/users', usersRoutes);

                 
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