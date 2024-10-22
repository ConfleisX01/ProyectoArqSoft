const { login, createNewAccount } = require('../DAO/LoginDAO')

function validateLogin(userName, password) {
    const response = { status: false }
    if (userName.length <= 0) {
        return response
    }

    if (password.length <= 0) {
        return response
    }

    login(userName, password)
    return response.status = true
}

function validateCreateNewAccount(userName, password) {
    const response = { status: false }
    if (userName.length <= 0) {
        return response
    }

    if (password.length <= 0) {
        return response
    }

    createNewAccount(userName, password)
    return response.status = true
}

module.exports = {
    validateLogin,
    validateCreateNewAccount
}