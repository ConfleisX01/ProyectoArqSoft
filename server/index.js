const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { login, createNewAccount, getAll, insert, update, updateBookStatus } = require('./DAO/BookDAO')

const app = express()

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json())

app.post('/login', async (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword

    try {
        const response = await login(userName, userPassword)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

app.post('/createAccount', async (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword

    try {
        const response = await createNewAccount(userName, userPassword)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

app.get('/books/list', async (req, res) => {
    try {
        const response = await getAll()
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

app.post('/books/create', async (req, res) => {
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGender = req.body.bookGender
    const bookStatus = req.body.bookStatus
    const bookRoute = req.body.bookRoute

    try {
        const response = await insert(
            bookName,
            bookAuthor,
            bookGender,
            bookStatus,
            bookRoute
        )
        res.send(error)
    } catch (error) {
        console.error(error)
    }
})

app.post('/books/update', async (req, res) => {
    const bookId = req.body.bookId
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGender = req.body.bookGender
    const bookStatus = req.body.bookStatus
    const bookRoute = req.body.bookRoute

    try {
        const response = await update(
            bookId,
            bookName,
            bookAuthor,
            bookGender,
            bookStatus,
            bookRoute
        )
        res.send(response)
    } catch (error) {
        console.error(error)
    }

})

app.post('/books/updateStatus', async (req, res) => {
    const bookId = req.body.bookId
    const bookStatus = req.body.bookStatus

    try {
        const response = await updateBookStatus(bookId, bookStatus)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})