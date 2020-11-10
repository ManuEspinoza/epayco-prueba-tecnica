const { Schema, model } = require('mongoose');
const AppError = require('../error/AppError');
const ClientSchema = new Schema({
    identification: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0
    }
})

ClientSchema.post('save', (err, res, next) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        throw new AppError('La información ingresada ya existe', 400, 401);
    }
    next();
})

const Client = model('Client', ClientSchema);

module.exports = Client;