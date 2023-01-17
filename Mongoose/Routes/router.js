const express = require('express')
const router = express.Router()
const Book = require('../models/book.js')

//Test
router.get('/test', (req, res) => {
    res.status(200).json({greeting: "Hello World!"})
})

//GET all
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find().limit(100)
        res.status(200).json(books)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//GET one
router.get('/books/:id', getBook, (req, res) => {
    res.json(res.book)
})

//GET one by author
router.get('/author/:name', async (req, res) => {
    let author
    try {
        const author = await Book.find({ author: req.params.name })
        res.status(200).json(author)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//POST one
router.post('/books/', async (req, res) => {
    const addBook = new Book({
        book: req.body.book
    })

    try{
        const newBook = await addBook.save()
        res.status(201).json(newBook)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//UPDATE one (use patch to update a single piece of data vs put which updates everything)
router.patch('/books/:id', getBook, async (req, res) => {
    if(req.body.book !== null) {
        res.book.book = req.body.book
    }

    try {
        const updateBook = await res.book.save()
        res.json(updateBook)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

//DELETE one
router.delete('/books/:id', getBook, async (req, res) => {
    try {
        await res.book.remove()
        res.json({message: "Deleted book!"})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

async function getBook(req, res, next) {
    let book
    try{
        book = await Book.findById(req.params.id)
        if(book === null) {
            return res.status(404).json({message: "Cannot find book!"})
        }
    } catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.book = book
    next()
}

module.exports = router