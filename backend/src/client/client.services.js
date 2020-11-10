const soap = require('soap');
const xml = 'myservice.wsdl';
const AppError = require('../error/AppError');
const parseString = require('xml2js').parseString;

const registerClientService = async (args) => {
    try {
        const serviceClient = await soap.createClientAsync(xml);
        const response = await serviceClient.registerClientAsync(args);
        return response[0];
    } catch (err) {
        parseString(err.body, function (err, result) {
            const errorCode = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:errorCode'][0];
            const message = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:error'][0];
            throw new AppError(message, errorCode, errorCode);
        });
    }
}

const addBalanceService = async (args) => {
    try {
        const serviceClient = await soap.createClientAsync(xml);
        const response = await serviceClient.addBalanceAsync(args);
        return response[0];
    } catch (err) {
        parseString(err.body, function (err, result) {
            const errorCode = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:errorCode'][0];
            const message = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:error'][0];
            throw new AppError(message, errorCode, errorCode);
        });
    }
}

const getBalanceService = async (args) => {
    try {
        const serviceClient = await soap.createClientAsync(xml);
        const response = await serviceClient.getBalanceAsync(args);
        return response[0];
    } catch (err) {
        parseString(err.body, function (err, result) {
            const errorCode = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:errorCode'][0];
            const message = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:error'][0];
            throw new AppError(message, errorCode, errorCode);
        });
    }
}

const makePaymentService = async (args) => {
    try {
        const serviceClient = await soap.createClientAsync(xml);
        const response = await serviceClient.makePaymentAsync(args);
        return response[0];
    } catch (err) {
        parseString(err.body, function (err, result) {
            const errorCode = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:errorCode'][0];
            const message = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:error'][0];
            throw new AppError(message, errorCode, errorCode);
        });
    }
}

const confirmPaymentService = async (args) => {
    try {
        const serviceClient = await soap.createClientAsync(xml);
        const response = await serviceClient.confirmPaymentAsync(args);
        return response[0];
    } catch (err) {
        parseString(err.body, function (err, result) {
            const errorCode = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:errorCode'][0];
            const message = result['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['soap:error'][0];
            throw new AppError(message, errorCode, errorCode);
        });
    }
}

module.exports = {
    registerClientService,
    addBalanceService,
    getBalanceService,
    makePaymentService,
    confirmPaymentService
}