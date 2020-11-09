const Client = require('./Client');
const Payment = require('../Payment/Payment');
const AppError = require('../error/AppError');
const sendEmail = require('../helpers/send-email');
const randomNumber = require('../helpers/random-number');
const { isBalanceValid, isCredentialsValid, isEmailValid, 
        isMobilePhoneValid, isIdentificationValid, isNameValid } = require('../helpers/validators');


const registerClient = async (req, res, next) => {
    try {
        const { identification, name, email, phone } = req.body;
        isIdentificationValid(identification);
        isNameValid(name);
        isEmailValid(email);
        isMobilePhoneValid(phone);
        const client = new Client({ identification, name, email, phone });
        await client.save();
        res.status(201).send(client);
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
        const client = await Client.findOne({ identification, phone });
        isCredentialsValid(client);
        client.balance = client.balance + balance;
        await client.save();
        res.status(200).send(client);
    } catch (e) {
        next(e);
    }
}

const getClientBalance = async (req, res, next) => {
    try {
        const { identification, phone } = req.body;
        console.log(identification, phone);
        isIdentificationValid(identification);
        isMobilePhoneValid(phone);
        const client = await Client.findOne({ identification, phone });
        isCredentialsValid(client);
        res.status(200).send({ balance: client.balance });
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
        const client = await Client.findOne({ identification, phone });
        isCredentialsValid(client);
        if(client.balance < balance) {
            throw new AppError('Fondos insuficientes, no puede realizar el pago', 400, 400);
        }
        let code = randomNumber();
        let payment = await Payment.findOne({ identification, code });
        while(payment) {
            code = randomNumber();
            payment = await Payment.findOne({ identification, code });
        }
        const newPayment = new Payment({ clientIdentification: identification, clientPhone: phone, 
            code: code, amountToPay: balance });
        await newPayment.save();
        sendEmail(client.email, client.name, code);
        res.send(newPayment);
    } catch (e) {
        next(e);
    }
}

const confirmPayment = async (req, res, next) => {
    try {
        const { identification, phone, code } = req.body;
        isIdentificationValid(identification);
        isMobilePhoneValid(phone);
        const client = await Client.findOne({ identification, phone });
        isCredentialsValid(client);
        const payment = await Payment.findOne({ clientIdentification: identification, clientPhone: phone, code });
        if(!payment){
            throw new AppError('El codigo es invalido, por favor verifica e intenta nuevamente', 400, 400);
        }
        if(payment.alreadyPaid) {
            throw new AppError('Este pago ya ha sido confirmado', 400, 400);
        }
        if(client.balance < payment.amountToPay) {
            throw new AppError('Fondos insuficientes, no se pudo realizar el pago', 400, 400);
        }
        client.balance = client.balance - payment.amountToPay;
        await client.save();
        payment.alreadyPaid = true;
        await payment.save();
        res.send(payment);
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