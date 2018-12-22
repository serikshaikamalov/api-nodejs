const User           = require('../models/user');
const jwt            = require('jsonwebtoken'); // used to create, sign, and verify tokens
const { JWT_SECRET } = require('../../config/constants');

generateToken = user => {

    // Payload
    const payload = {
        id: user.id,
        email: user.email
    }

    // Options
    const options = {
        expiresIn: 86400 // seconds: 24 hour
    }

    return jwt.sign(payload, JWT_SECRET, options);
}

module.exports.login = (req, res)=>{

    // Find User
    const query = {
        email: req.body.email            
    }

    User.findOne(query, (err, userEntity)=>{

        // If user not fount
        if (err) throw err;

        if (userEntity) {                    
            // Check: if password matches            
            if ( req.body.password && userEntity.password != req.body.password) {
                res.status(400).json({ message: 'Authentication failed. Wrong password.' });
            }else{
                
                const user = { 
                    id: result._id,
                    email: userEntity.email, 
                    firstname: userEntity.firstname, 
                    lastname: userEntity.lastname 
                };
                                                
                // Token: Generate
                const token = generateToken(user)
        
                res.json({   
                    user: user,                 
                    token: token
                });
            }               
        }else{
            res.status(400).json({ message: 'Authentication failed. User not found.' });
        }
    });
}

module.exports.register = async (req, res, next)=>{

    console.log('BODY: ', req.body);

    const { email, password, firstname, lastname } = req.body;

    // Check: User exist
    await User.findOne({ 'local.email': email }, (err, user)=>{        

        if(err){
            console.log('Error true');
            return res.status(400).json({error: 'Something went wrong!'})            
        }

        if(user){        
            console.log('User fond');
            return res.json({error: 'User already registered!'});            
        }else{
            const newUser = {
                method: 'local',
                local: {
                    email: email,
                    firstname:  firstname,
                    lastname: lastname,
                    password: password
                }                
            };
            
            // Save new user to DB
            User.create(newUser, (err, result)=>{
                if( err ){
                    console.log('Create error true', err);
                    return res.status(400).json({error: 'User not saved!'});
                }else{
                    
                    const user = { 
                        id: result._id,
                        email: result.email, 
                        firstname: result.firstname, 
                        lastname: result.lastname 
                    };

                    // Token: Generate
                    const token = generateToken(user);
                    
                    // Send to Client
                    res.json({
                        user: user,              
                        token: token
                    });
                }        
            });  
        }       
    }); 
}

module.exports.localLogin = (req, res)=>{
    // console.log('req.user: ', req.user );    

    const token = generateToken(req.user);

    res.status(200).json({token});
}

module.exports.googleOAuth = (req, res)=>{
    console.log('req.user: ', req.user );

    // Generate token    
    const token = generateToken(req.user);

    res.status(200).json({token});
}

module.exports.facebookOAuth = (req, res)=>{
    console.log('req.user: ', req.user );

    // Generate token    
    const token = generateToken(req.user);

    res.status(200).json({token});
}

module.exports.authViaVkontakte = (req, res)=>{}