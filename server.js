//imports

const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')

dotenv.config();

//import Schema
const Book = require('./models/book.js')

//consts

const app = express()


app.use(express.urlencoded({ extended: false }));
//middleware
app.use(morgan('dev'))

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

app.post('/books', async (req, res) =>{
    const createdBook = await Book.create(req.body)
    res.redirect('/books/new')
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