// Get Data Models
const User = require('../models/user')

exports.getUsers = (req, res, next) => {
                
    User.find({}, ( err, users )=>{        
        if (err){ res.status(400).json(err); }
        res.json(users)
    });    
}

exports.getSingleUser = (req, res, next) => {
                
    const _id = req.params.id;    
    User.findOne({ _id }, (err, user)=>{
        res.json( user );
    });   
}

exports.AddUser = ( req, res, next ) =>{
    const userData = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    });

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

    const id = req.params.id;
    const query = { '_id': id };

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    console.log('User: ', user);

    User.update( query, user, (err, result) =>{
        if (err) {
            res.json({'error':'An error has occurred'});
        }

        res.json('Updated successfully!')
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