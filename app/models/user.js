var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model('User', new Schema({ 
	firstname: String, 
    lastname: String,
    email: String,
    password: String,
    role: String   
}));