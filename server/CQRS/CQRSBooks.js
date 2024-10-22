const { getAll, insert, update, updateBookStatus, getBookById } = require('../DAO/BookDAO')

function validateInsertBook(bookName, bookAuthor, bookGenre, bookStatus, bookRoute) {
    const response = { status: false, message: 'Error en la consulta' }

    if (bookName.length <= 0) {
        response.message = 'El nombre del libro no debe de estar vacio'
        return response
    }

    if (bookGenre.length <= 0) {
        response.message = 'El genero del libro no debe de estar vacio'
        return response
    }

    if (bookName.length < 5 || bookName.length > 100) {
        response.message = 'El nombre del libro no debe ser menor a 5 o mayor a 100 caracteres'
        return response
    }

    if (bookGenre.length < 5 || bookGenre.length > 100) {
        response.message = 'El genero del libro no debe de ser menor a 5 o mayor a 100'
        return response
    }

    insert(bookName, bookAuthor, bookGenre, bookStatus, bookRoute)
    return response.status = true
}

function validateUpdateBook(bookId, bookName, bookAuthor, bookGenre, bookStatus, bookRoute) {
    const response = { status: false }

    if (bookName.length <= 0) {
        return response
    }

    if (bookGenre.length <= 0) {
        return response
    }

    if (bookName.length < 5 || bookName.length > 100) {
        return response
    }

    if (bookGenre.length < 5 || bookGenre.length > 100) {
        return response
    }

    update(bookId, bookName, bookAuthor, bookGenre, bookStatus, bookRoute)
    return response.status = true
}

module.exports = {
    validateInsertBook,
    validateUpdateBook
}