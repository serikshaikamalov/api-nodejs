const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Create a schema
const userSchema = mongoose.Schema({ 
    method:{
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,            
            lowercase: true
        },
        password: String,
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
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
    email: String,       
    role: String,
    avatar: String,
    password: String,
    registerDate: String,
    lastvisitDate: String,
    activation: String,
    isEmailSend: Boolean,
    isBlocked: Boolean,
    sex: {
        type: String,
        enum: ['man', 'woman'],        
    },
    birthDate: String
});

userSchema.pre('save', async function(next){
        
    try {

        if(this.method !== 'local'){
            next(); 
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate hashed password (salt + password)
        const passwordHashed = await bcrypt.hash( this.local.password, salt);
        
        // Re-assign hashed password
        this.password = passwordHashed;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword){

    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }

}

// Create a model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports =  User;
