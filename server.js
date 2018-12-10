const express       = require('express');
const mongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
var jwt             = require('jsonwebtoken'); // used to create, sign, and verify tokens
var ObjectID        = require('mongodb').ObjectID;

const app           = express();
const port          = 4000;


/**
 * Each request goes
 * 1. Check user token
 * 2. Check user permission
 * 3. Return result
 */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoClient.connect('mongodb://localhost:27017', (err, database)=>{

    if (err) return console.log(err);
    
    var db = database.db('test');    

    // ############################ PUBLIC API ############################    

    /**     
     * ORDER IS IMPORTANT!
     * User: List
     */
    app.get('/users', (req, res) =>{                

        db.collection("users").find().toArray(( err, result )=>{
            // console.log('Users: ', result);
            res.send(JSON.stringify(result));
        });

    });

    

    /**
     * User: Details
     */
    app.get('/users/:id', (req, res, next)=>{

        let userId = ObjectID(req.params.id);
        console.log('User Id', userId);

        db.collection('users').findOne({ '_id': userId }, (err, item)=>{
            res.send( item );
        });

    });


    /**
     * Autheticate user
     */
    app.post('/authenticate', (req, res)=>{

        // Find User
        const query = {
            email: req.body.email            
        }

        db.collection("users").findOne(query, (err, user)=>{

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            }

            // Check: if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }


            // Generate token and send to client
            const payload = {
                email: user.email,
                role: user.role ? user.role : null
            };

            var token = jwt.sign(payload,'Arabtili.kz',{
                expiresIn: 1440 // seconds
            });

            res.json({
                token: token
            });
        });



    });


    /**
     * Вызывается в каждом HTTP запросе
     */
    app.use((req, res, next) => {

        console.log('First');

        var token = req.body.token;

        
        if( token ){

            // verifies secret and checks exp
            jwt.verify( token, 'Arabtili.kz', (err, decoded)=>{

                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' })
                }

                console.log('Decoded: ', decoded);
                req.user = decoded;
                next();

            });
            
            
        }else{
            res.status(400).send('Token false');  
        }

        
    });
    

            

    // ############################ PRIVATE USER API ############################    
    app.use('/users/add', permit("user", "admin"));


    /**
     * User: Save
     */
    app.post('/users/add', (req, res, next) => {

        console.log('Third');

        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            role: req.body.role
        }

        db.collection("users").save( user, (err, result)=>{
            if(err) return console.log(err);
            res.send("Added new users");
        });


    });



    // ############################ PRIVATE ADMIN API ############################
    app.use([ '/users/update/:id', 
              '/users/delete/:id'
            ], permit("admin"));

    /**
     * User: Update
     */
    app.post('/users/update/:id',  ( req, res )=>{
       
        const id = req.params.id;
        const query = { '_id': ObjectID(id) };

        const user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }

        console.log('User: ', user);

        db.collection('users').update( query, user, (err, result) =>{
            if (err) {
                res.send({'error':'An error has occurred'});
            }

            res.send(user)
        });
        
    });


    /**
     * User: Delete
     */
    app.post('/users/delete/:id', (req, res)=>{
        const id = req.params.id;
        const query = { '_id': ObjectID(id) };

        db.collection('users').remove(query, ( err, result )=>{
            if( err ){
                res.send({'error':'An error has occurred'});
            }

            res.send('User ' + id + ' deleted!');
        })
    });

    

    
    /**
     * App: Start
     */
    app.listen(port, (error) => {

        if(error){
            console.error(error);
        }

        console.log(`Example app listening on port ${port}!`);
    });
    
});


function permit(...allowed){
    
    
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        console.log('Second');
        console.log('Request: ', req.user.role.name);        
        if( req.user && isAllowed(req.user.role.name)){
            next();
        }else{
            res.status(403).json({message: "Forbidden"}); // user is forbidden
        }        
    }
    
}
