const AppError = require('../error/AppError');
const validator = require('validator');

const isIdentificationValid = (identification) => {
    if (identification === undefined) {
        throw new AppError('Todos los campos son obligatorios', 400, 400);
    }
    if (identification <= 0) {
        throw new AppError('Identificación invalida', 400, 400);
    }
}

const isNameValid = (name) => {
    if (name === undefined || validator.isEmpty(validator.trim(name))) {
        throw new AppError('Todos los campos son obligatorios', 400, 400);
    }
}

const isEmailValid = (email) => {
    if (email === undefined || validator.isEmpty(validator.trim(email))) {
        throw new AppError('Todos los campos son obligatorios', 400, 400);
    }
    if (!validator.isEmail(email)) {
        throw new AppError('Correo inválido', 400, 400);
    }
}

const isMobilePhoneValid = (phone) => {
    if (phone === undefined || validator.isEmpty(validator.trim(phone))) {
        throw new AppError('Todos los campos son obligatorios', 400, 400);
    }
    if (!validator.isMobilePhone(phone)) {
        throw new AppError('Número de telefono inválido', 400, 400);
    }
}

const isBalanceValid = (balance) => {
    if (balance === undefined) {
        throw new AppError('Todos los campos son obligatorios', 400, 400);
    }
    if (balance <= 0) {
        throw new AppError('Balance inválido, por favor ingresa un número positivo', 400, 400);
    }
}

const isCredentialsValid = (client) => {
    if (!client) {
        throw new AppError('Credenciales inválidas, por favor verifique e intente nuevamente', 404, 400);
    }
}

module.exports = {
    isBalanceValid,
    isCredentialsValid,
    isMobilePhoneValid,
    isEmailValid,
    isIdentificationValid,
    isNameValid
}