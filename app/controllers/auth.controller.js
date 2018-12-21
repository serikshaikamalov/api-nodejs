const User     = require('../models/user');
const jwt      = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports.login = (req, res)=>{

    // Find User
    const query = {
        email: req.body.email            
    }

    User.findOne(query, (err, user)=>{

        // If user not fount
        if (err) throw err;

        if (user) {                    
            // Check: if password matches            
            if ( req.body.password && user.password != req.body.password) {
                res.status(400).json({ message: 'Authentication failed. Wrong password.' });
            }else{
                
                // Generate token and send to client
                var payload = {
                    email: user.email,
                    role: user.role      
                };
                    
                // Token: Generate
                var token = jwt.sign(payload,'Arabtili.kz',{
                    expiresIn: 86400 // seconds: 24 hour
                });
        
                res.json({
                    payload: payload,
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
    await User.findOne({ email: email }, (err, user)=>{        

        if(err){
            console.log('Error true');
            return res.status(400).json({error: 'Something went wrong!'})            
        }

        if(user){        
            console.log('User fond');
            return res.json({error: 'User already registered!'});            
        }else{
            const newUser = {
                email: email,
                firstname:  firstname,
                lastname: lastname,
                password: password
            };
            
            // Save new user to DB
            User.create(newUser, (err, status)=>{
                if( err ){
                    console.log('Create error true', err);
                    return res.status(400).json({error: 'User not saved!'});
                }else{
                    console.log('status:', status);     
                    res.status(200).json({error: 'User is registered!'});         
                }        
            });  

        }            
    }); 
    
    console.log('OutSide');      

    // Create new user
       
    
}

module.exports.authViaVkontakte = (req, res)=>{
   
}