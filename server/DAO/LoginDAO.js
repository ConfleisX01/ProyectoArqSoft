const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'libros'
})

function login(userName, userPassword) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM users WHERE user_name = ? AND user_password = ?',
            [userName, userPassword],
            (err, response) => {
                if (err) {
                    reject(err)
                } else {
                    if (response.length === 0) {
                        resolve('No se encontro el usuario')
                    }
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
    login,
    createNewAccount
}