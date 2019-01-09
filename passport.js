const User                    = require('./app/models/user');
const { oauth }                  = require('./config/constants');

const passport                = require('passport');
const JWTStrategy             = require('passport-jwt').Strategy;
const LocalStrategy           = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy   = require('passport-facebook-token');
const { ExtractJwt }          = require('passport-jwt');
const { JWT_SECRET }          = require('./config/constants');



// JSON WEB TOKEN STRATEGY
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done)=>{

    console.log('Payload: ', payload.id);

    try {
        // Find the user token
        const user = await User.findById(payload.id);

        console.log('User', user);

        // If user doesnt exist, handle it
        if(!user){
            return done(null, false);
        }

        // Otherwise return the user
        done(null, user);

        
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({

    usernameField: 'email'

}, async ( email, password, done )=>{

    try {    
     
        // Find user by email
        const userModel = await User.findOne({'local.email': email});

        // If not, handle it
        if(!userModel){
            return done(null, false);
        }

        console.log('UserModel ', userModel);        

        // Check is password is correct
        const isMatch = await userModel.isValidPassword(password);

        console.log('Password match: ', isMatch);

        if(!isMatch){
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, userModel);
        
    } catch (error) {
        done(error, false);
    }    

}));


// GOOGLE OAUTH STRATEGY
passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID: '413593623072-g24vajl6kabtu3o353s6gkuimn3noiok.apps.googleusercontent.com',
    clientSecret: 'v--_LPZ2hnA_P2rUy2tl0emZ'
},
    async ( accessToken, refreshToken, profile, done )=>{

        try {
            console.log('accessToken', accessToken);
            console.log('refreshToken', refreshToken);
            console.log('profile', profile);

            // Check user exist in db
            const existingUser = await User.findOne({ "google.id": profile.id });
            if( existingUser ){
                console.log('User already exist in our DB');
                return done(null, existingUser);
            }

            console.log('User doesnt exist, we are creating a new one');

            // If new user
            const newUser = new User({
                method: 'google',
                google: {
                    id: profile.id,
                    email: profile.emails[0].value
                }
            });

            await newUser.save();
            done(null, newUser);
            
        } catch (error) {
            done(error, false, error.message);
        }

        

}));


// FACEBOOK OAUTH STRATEGY
passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: oauth.facebook.clientID,
    clientSecret: oauth.facebook.clientSecret
},
    async ( accessToken, refreshToken, profile, done)=>{

        console.log('Facebook Profile', profile);

        // Check user exist in db
        const existingUser = await User.findOne({ "email": profile.emails[0].value });
        if( existingUser ){
            console.log('User already exist in our DB');
            return done(null, existingUser);
        }else{
            console.log('User doesnt exist, we are creating a new one');

            // If new user
            const newUser = new User({
                method: 'facebook',
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value
                },
                email: profile.emails[0].value,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName                
            });

            await newUser.save();
            done(null, newUser);
        }

        
        try {
            
        } catch (error) {
            done(error, false, error.message);            
        }
}));