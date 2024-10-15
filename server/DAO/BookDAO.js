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

function login(userName, userPassword) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM users WHERE user_name = ? AND user_password = ?',
            [userName, userPassword],
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

function createNewAccount(userName, userPassword) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO users (user_name, user_password) VALUES (?, ?)',
            [userName, userPassword],
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
    login,
    createNewAccount
}