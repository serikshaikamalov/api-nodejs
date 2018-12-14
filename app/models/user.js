// External Dependancies
var mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
    firstname: String, 
    lastname: String,
    email: String,
    password: String,
    role: String   
});

module.exports =  mongoose.model('User', userSchema);