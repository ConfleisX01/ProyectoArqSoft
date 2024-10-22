const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

function getAll() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM books', (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(response)
            }
        })
    })
}

function insert(bookName, bookAuthor, bookGender, bookStatus, bookRoute) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO books (book_name, author, gender, book_status, book_route) VALUES (?, ?, ?, ?, ?)',
            [bookName, bookAuthor, bookGender, bookStatus, bookRoute],
            (err, response) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response)
                }
            }
        )
    })
}

function update(bookId, bookName, bookAuthor, bookGender, bookStatus, bookRoute) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE books SET book_name = ?, author = ?, gender = ?, book_status = ?, book_route = ? WHERE id_book = ?',
            [bookName, bookAuthor, bookGender, bookStatus, bookRoute, bookId],
            (err, response) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response)
                }
            }
        )
    })
}

function updateBookStatus(bookId, bookStatus) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE books SET book_status = ? WHERE id_book = ?',
            [bookStatus, bookId],
            (err, response) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response)
                }
            }
        )
    })
}

function getBookById(bookId) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM books WHERE id_book = ?',
            [bookId],
            (err, response) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(response)
                }
            }
        )
    })
}

module.exports = {
    getAll,
    insert,
    update,
    updateBookStatus,
    getBookById
}
