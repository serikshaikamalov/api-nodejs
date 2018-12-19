// Get Data Models
const User = require('../models/user');
const constants = require('../../config/constants');

exports.getUsers = (req, res, next) => {
                
    User.find({}, ( err, users )=>{        
        if (err){ res.status(400).json(err); }
        res.json(users)
    });    
}

exports.getSingleUser = (req, res, next) => {
                
    const _id = req.params.id;    
    User.findOne({ _id }, (err, user)=>{

        // Modify avatar
        user.avatar = constants.STATIC_SERVER_HTTP + user.avatar;
        res.json( user );
    });   
}

exports.AddUser = ( req, res, next ) =>{

    console.log('Body: ', req.body );
    console.log('Files: ', req.files );

    // Defaults
    let files = {
        avatar: null
    }

    // Collect Data Model
    if( req.files && req.files.length > 0 ){

        // Avatar
        const avatarImage = req.files.filter(x => x.fieldname == 'avatar').shift();
        if( avatarImage ){
            files.avatar = constants.IMAGE_PATH + avatarImage.filename;
        }
    }
        
    const userData = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        avatar: files.avatar
    });

    // Save to DB
    User.create( userData, (err, result)=>{
        if(err){
            return console.log(err);
        }else{
            res.status(200).json("Added new users");
        }        
    });
}

exports.UpdateUser = ( req, res, next ) => {
    console.log('params:', req.params);
    console.log('body', req.body);

    /**
     * Params
     */
    const id = req.params.id;
    const query = { '_id': id };

    // Defaults
    let files = {
        avatar: null
    }

    // Files
    if( req.files && req.files.length > 0 ){

        // Avatar
        const avatarImage = req.files.filter(x => x.fieldname == 'avatar').shift();
        if( avatarImage ){
            files.avatar = constants.IMAGE_PATH + avatarImage.filename;
        }        
    }

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        avatar: files.avatar
    }

    // const userData = new User({
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname,
    //     // email: req.body.email,
    //     // role: req.body.role,
    //     // password: req.body.password,
    //     // avatar: files.avatar
    // });

    console.log('User: ', user);

    User.updateOne( query, user, (err, result) =>{
        if (err) {
            res.json({'error':'An error has occurred'});
        }else{
            res.json('Updated successfully!')
        }
        
    });
}

exports.DeleteUser = ( req, res, next ) => {
    const id = req.params.id;
    const query = { '_id': id };

    User.remove(query, ( err, result )=>{
        if( err ){
            res.json({'error':'An error has occurred'});
        }
        res.json('User ' + id + ' deleted!');
    })
}