const dotenv = require("dotenv").config();
const express = require('express')
const app = express()
 
const mongoose = require('mongoose')

mongoose.set('strictQuery', false).connect(process.env.CONNECTION_STRING)
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to database!'))

app.use(express.json())

const router = require('./Routes/router.js')
app.use('/api', router)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server running on port: ', port)
})