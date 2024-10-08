const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

app.use(cors())

app.get('/login', (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword

    connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?', [userName, userPassword], (err, response) => {
        if (err) throw err
        res.send(response)
    })
})

app.get('/books/list', (req, res) => {
    connection.query('SELECT * FROM books', (err, response) => {
        if (err) throw err
        res.send(response)
    })
})

app.post('/books/create', (req, res) => {
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGender = req.body.bookGender
    const bookStatus = req.body.bookStatus
    const bookRoute = req.body.bookStatus
    connection.query('INSERT INTO books (book_name, author, gender, book_status, book_route) VALUES ?, ?, ?, ?, ?', (err, response) => {
        if (err) throw err
        res.send(response)
    })
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})