// External Dependancies
var mongoose = require('mongoose');

const userSchema = mongoose.Schema({ 
    firstname: {
        type: String,        
        required: false,
        unique: false,
    }, 
    lastname: {
        type: String,
        required: false,        
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: String,
    role: String,
    avatar: String
});

module.exports =  mongoose.model('User', userSchema);