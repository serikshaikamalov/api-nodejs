const Book      = require('../models/book');
const constants = require('../../config/constants');

exports.getBooks = (req, res, next) => {
                
    Book.find({}, ( err, booksFromDB )=>{

        if (err){ res.status(400).json(err); }

        // Modify: Image Path
        booksFromDB.map( x =>{
            x.AvatarSource = x.AvatarSource ? constants.STATIC_SERVER_HTTP + x.AvatarSource : null
        });
         
        res.json(booksFromDB);
    });    
}

exports.getSingleBook = (req, res, next) => {
                
    const _id = req.params.id;        
    Book.findOne({ _id }, (err, bookFromDB)=>{        

        // Modify avatar
        bookFromDB.AvatarSource = constants.STATIC_SERVER_HTTP + bookFromDB.AvatarSource;
        res.json( bookFromDB );
    });   
}