const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    publicationYear: Number,
    genre: String,
    description: String,
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book


// const bookSchema = new mongoose.Schema({
//     name: {type : String, required: true},
//     author: {type: String, required: true},
//     publicationYear: {type: Number, required: true},
//     genre: String,
//     description: String,
// })