const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json())

app.post('/login', (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword

    connection.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?', [userName, userPassword], (err, response) => {
        if (err) throw err
        res.send(response)
        console.log(response)
    })
})

app.post('/createAccount', (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword

    connection.query('INSERT INTO users (user_name, user_password) VALUES (?, ?)',
        [userName, userPassword],
        (err, response) => {
            if (err) throw err
            res.send(response)
        }
    )
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
    const bookRoute = req.body.bookRoute

    connection.query('INSERT INTO books (book_name, author, gender, book_status, book_route) VALUES (?, ?, ?, ?, ?)',
        [bookName, bookAuthor, bookGender, bookStatus, bookRoute],
        (err, response) => {
            if (err) throw err
            res.send(response)
        })
})

app.post('/books/update', (req, res) => {
    const bookId = req.body.bookId
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGender = req.body.bookGender
    const bookStatus = req.body.bookStatus
    const bookRoute = req.body.bookRoute

    connection.query('UPDATE books SET book_name = ?, author = ?, gender = ?, book_status = ?, book_route = ? WHERE id_book = ?',
        [bookName, bookAuthor, bookGender, bookStatus, bookRoute, bookId],
        (err, response) => {
            if (err) throw err
            res.send(response)
        })
})

app.post('/books/updateStatus', (req, res) => {
    const bookId = req.body.bookId
    const bookStatus = req.body.bookStatus

    connection.query('UPDATE books SET book_status = ? WHERE id_book = ?',
        [bookStatus, bookId],
        (err, response) => {
            if (err) throw err
            res.send(response)
        }
    )
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})