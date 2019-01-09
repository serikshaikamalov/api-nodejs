const mongoose = require('mongoose');

// Create a schema
const bookSchema = mongoose.Schema({ 
    Title: String,
    Description: String,
    Author: String,    
    AvatarSource: String,
    BookSource: String,
    CreatedDate: String,
    Hits: Number
});


// Create a model
const Book = mongoose.model('Book', bookSchema);

// Export the model
module.exports =  Book;
