const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')

const { validateLogin, validateCreateNewAccount } = require('./CQRS/CQRSLogin')
const { validateInsertBook, validateUpdateBook } = require('./CQRS/CQRSBooks')
const { updateBookStatus } = require('./DAO/BookDAO')
const { getAll } = require('./DAO/BookDAO')
const { BookPublic } = require('./VM/bookExport')

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
        const response = await validateLogin(userName, userPassword)
        res.send(response)
    } catch (error) {
        console.error(error)
    }
})

app.post('/createAccount', async (req, res) => {
    const userName = req.body.userName
    const userPassword = req.body.userPassword

    try {
        const response = validateCreateNewAccount(userName, userPassword)
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

app.get('/book/listPublic', async (req, res) => {
    try {
        const mappedBooks = []
        const response = await getAll()
        response.forEach(book => {
            const newBook = new BookPublic(
                book.id_book,
                book.book_name,
                book.author,
                book.gender,
                book.book_status,
                book.book_route
            )
            mappedBooks.push(newBook)
        });
        res.status(200).send(mappedBooks)
    } catch (error) {
        console.error(error)
    }
})

app.post('/books/create', async (req, res) => {
    const bookName = req.body.bookName
    const bookAuthor = req.body.bookAuthor
    const bookGender = req.body.bookGender
    const bookRoute = req.body.bookRoute

    try {
        const validationResponse = validateInsertBook(bookName, bookAuthor, bookGender, bookRoute)
        if (validationResponse.status) {
            res.status(200).send('El libro se creo con exito')
        } else {
            res.status(422).send(validationResponse.message)
        }
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
        const validationResponse = validateUpdateBook(bookId, bookName, bookAuthor, bookGender, bookStatus, bookRoute)

        if (validationResponse.status) {
            res.status(200).send("El libro se actualizo con exito")
        } else {
            res.status(422).send(validationResponse.message)
        }
    } catch (error) {
        console.error(error)
    }

})

app.post('/books/updateStatus', async (req, res) => {
    const bookId = req.body.bookId
    const bookStatus = req.body.bookStatus

    try {
        const response = await updateBookStatus(bookId, bookStatus)
        if (response.status) {
            res.send(response)
        } else {
            res.send(response)
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})