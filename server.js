//imports

const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require("method-override");
const path = require("path");

dotenv.config();

//import Schema
const Book = require('./models/book.js')

//consts

const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

//routes
app.get('/', async (req, res) => {
    res.render('index.ejs')
})

app.get('/books', async (req, res) =>{
    const allBooks = await Book.find()
    res.render('./books/index.ejs', {Book: allBooks})
})

app.get('/books/new', async (req, res) =>{
    res.render('./books/new.ejs')
})

app.get('/books/:bookID', async (req, res) =>{
    const bookID = req.params.bookID
    const foundBook = await Book.findById(bookID)
    res.render('./books/show.ejs', {Book : foundBook})
})

//post
app.post('/books', async (req, res) =>{
    const createdBook = await Book.create(req.body)
    res.redirect('/books/new')
})

//delete
app.delete('/books/:bookID', async (req, res) =>{
    await Book.findByIdAndDelete(req.params.bookID)
    res.redirect('/books')
})

//update
app.get('/books/:bookID/edit', async (req, res) =>{
    const bookID = req.params.bookID
    const foundBook = await Book.findById(bookID)
    res.render('./books/edit.ejs', {Book : foundBook})
})

app.put('/books/:bookID', async (req, res) => {
    const bookID = req.params.bookID
    await Book.findByIdAndUpdate(bookID, req.body)
    res.redirect(`/books/${bookID}`)
})
 
//server connect
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected')
        app.listen(process.env.PORT, () => {
            console.log(`Server connected on port: ${process.env.PORT}`)
        })               
    } catch (error) {
        console.log(error)         
    }
}

connect()