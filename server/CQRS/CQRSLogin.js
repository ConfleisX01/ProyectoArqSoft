const { login, createNewAccount } = require('../DAO/LoginDAO')

async function validateLogin(userName, password) {
    const response = { status: false, result: [] }
    if (userName.length <= 0) {
        return response
    }

    if (password.length <= 0) {
        return response
    }

    const result = await login(userName, password)
    response.result = result
    response.status = true
    return response
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