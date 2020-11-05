const Client = require('./Client');
const AppError = require('../error/AppError');
const validator = require('validator');

const registerClient = async (req, res, next) => {
    try {
        const { document, name, email, phone } = req.body;
        if (document === undefined || name === undefined || email === undefined || phone === undefined) {
            throw new AppError('Todos los campos son obligatorios', 400, 400);
        }
        if (validator.isEmpty(validator.trim(name)) || validator.isEmpty(validator.trim(email)) || 
        validator.isEmpty(validator.trim(phone))) {
            throw new AppError('Todos los campos son obligatorios', 400, 400);
        }
        if (document <= 0) {
            throw new AppError('Identificacion invalida', 400, 400);
        }
        if (!validator.isMobilePhone(phone)) {
            throw new AppError('Numero de telefono invalido', 400, 400);
        }
        if (!validator.isEmail(email)) {
            throw new AppError('Correo invalido', 400, 400);
        }
        const client = new Client({ document, name, email, phone });
        await client.save();
        res.status(201).send(client);
    } catch (e) {
        next(e);
    }
}

const addClientBalance = async (req, res, next) => {
    res.send("agregar fondos");
}

const getClientBalance = async (req, res, next) => {
    res.send("obtener fondos");
}

module.exports = {
    registerClient,
    addClientBalance,
    getClientBalance
}