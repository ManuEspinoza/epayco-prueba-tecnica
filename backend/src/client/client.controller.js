const AppError = require('../error/AppError');
const sendEmail = require('../helpers/send-email');
const { isBalanceValid, isEmailValid,
    isMobilePhoneValid, isIdentificationValid, isNameValid } = require('../helpers/validators');
const { registerClientService, addBalanceService, getBalanceService, makePaymentService,
    confirmPaymentService } = require('./client.services');

const registerClient = async (req, res, next) => {
    try {
        const { identification, name, email, phone } = req.body;
        isIdentificationValid(identification);
        isNameValid(name);
        isEmailValid(email);
        isMobilePhoneValid(phone);
        args = {
            name: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: name
            },
            email: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: email
            },
            phone: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: phone
            },
            identification: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: identification
            }
        }
        const response = await registerClientService(args);
        res.status(201).send({ message: response.message });
    } catch (e) {
        next(e);
    }
}

const addClientBalance = async (req, res, next) => {
    try {
        const { identification, phone, balance } = req.body;
        isIdentificationValid(identification);
        isMobilePhoneValid(phone);
        isBalanceValid(balance);
        args = {
            balance: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: balance
            },
            phone: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: phone
            },
            identification: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: identification
            }
        }
        const response = await addBalanceService(args);
        res.status(200).send({ message: response.message });
    } catch (e) {
        next(e);
    }
}

const getClientBalance = async (req, res, next) => {
    try {
        const { identification, phone } = req.body;
        isIdentificationValid(identification);
        isMobilePhoneValid(phone);
        args = {
            phone: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: phone
            },
            identification: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: identification
            }
        }
        const response = await getBalanceService(args);
        res.status(200).send({ message: response.message });
    } catch (e) {
        next(e);
    }
}

const makePayment = async (req, res, next) => {
    try {
        const { identification, phone, balance } = req.body;
        isIdentificationValid(identification);
        isMobilePhoneValid(phone);
        isBalanceValid(balance);
        args = {
            balance: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: balance
            },
            phone: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: phone
            },
            identification: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: identification
            }
        }
        const response = await makePaymentService(args);
        sendEmail(response.email, response.name, response.code);
        res.send({
            clientPhone: response.phone,
            clientIdentification: response.identification,
            message: "¡Por favor confirma tu pago, te hemos enviado una clave a tu correo!"
        });
    } catch (e) {
        next(e);
    }
}

const confirmPayment = async (req, res, next) => {
    try {
        const { identification, phone, code } = req.body;
        isIdentificationValid(identification);
        isMobilePhoneValid(phone);
        args = {
            code: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: code
            },
            phone: {
                attributes: { 'xsi:type': 'xsd:string' },
                $value: phone
            },
            identification: {
                attributes: { 'xsi:type': 'xsd:number' },
                $value: identification
            }
        }
        const response = await confirmPaymentService(args);
        res.send({ message: response.message });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    registerClient,
    addClientBalance,
    getClientBalance,
    makePayment,
    confirmPayment
}