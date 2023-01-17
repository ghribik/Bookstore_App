const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    cover: {
        type: String,
    },
    isbn: {
        type: Number,
    },
    price: {
        type: Number,
    }
})

module.exports = mongoose.model('book', reviewSchema)