const Client = require('./Client');
const AppError = require('../error/AppError');
const randomNumber = require('../helpers/random-number');
const Payment = require('../payment/Payment');

const ClientController = {
    Client_Service: {
        Client_Port: {
            registerClient: async function (args) {
                try {
                    const data = {
                        identification: args.identification.$value,
                        name: args.name.$value,
                        email: args.email.$value,
                        phone: args.phone.$value
                    };
                    const client = new Client({ ...data });
                    await client.save();
                    return {
                        message: `¡Cliente registrado con éxito!`
                    }
                } catch (error) {
                    console.log(error);
                    throw {
                        Fault: {
                            error: error.message ? error.message : "Algo salió mal",
                            errorCode: error.errorCode ? error.errorCode : 500,
                            statusCode: error.statusCode ? error.statusCode : 500
                        }
                    }
                }
            },
            addBalance: async function (args) {
                try {
                    const balance = args.balance.$value;
                    const client = await Client.findOne({ identification: args.identification.$value, phone: args.phone.$value });
                    if (!client) {
                        throw new AppError('Credenciales inválidas, por favor verifique e intente nuevamente', 404, 400);
                    }
                    client.balance = client.balance + balance;
                    await client.save();
                    return {
                        message: `¡Recargaste ${balance}$ a tu billetera con éxito!`
                    }
                } catch (error) {
                    throw {
                        Fault: {
                            error: error.message ? error.message : "Algo salió mal",
                            errorCode: error.errorCode ? error.errorCode : 500,
                            statusCode: error.statusCode ? error.statusCode : 500
                        }
                    }
                }
            },
            getBalance: async function (args) {
                try {
                    const client = await Client.findOne({ identification: args.identification.$value, phone: args.phone.$value });
                    if (!client) {
                        throw new AppError('Credenciales inválidas, por favor verifique e intente nuevamente', 404, 400);
                    }
                    return {
                        message: `Tienes un saldo de ${client.balance}$`
                    }
                } catch (error) {
                    throw {
                        Fault: {
                            error: error.message ? error.message : "Algo salió mal",
                            errorCode: error.errorCode ? error.errorCode : 500,
                            statusCode: error.statusCode ? error.statusCode : 500
                        }
                    }
                }
            },
            makePayment: async function (args) {
                try {
                    const identification = args.identification.$value;
                    const phone = args.phone.$value;
                    const balance = args.balance.$value;
                    const client = await Client.findOne({ identification, phone });
                    if (!client) {
                        throw new AppError('Credenciales inválidas, por favor verifique e intente nuevamente', 404, 400);
                    }
                    if (client.balance < balance) {
                        throw new AppError('Fondos insuficientes, no puede realizar el pago', 400, 400);
                    }
                    let code = randomNumber();
                    let payment = await Payment.findOne({ identification, code });
                    while (payment) {
                        code = randomNumber();
                        payment = await Payment.findOne({ identification, code });
                    }
                    const newPayment = new Payment({
                        clientIdentification: identification, clientPhone: phone,
                        code: code, amountToPay: balance
                    });
                    await newPayment.save();
                    return {
                        name: client.name,
                        email: client.email,
                        code: code,
                        phone: client.phone,
                        identification: client.identification
                    }
                } catch (error) {
                    throw {
                        Fault: {
                            error: error.message ? error.message : "Algo salió mal",
                            errorCode: error.errorCode ? error.errorCode : 500,
                            statusCode: error.statusCode ? error.statusCode : 500
                        }
                    }
                }
            },
            confirmPayment: async function (args) {
                try {
                    const identification = args.identification.$value;
                    const phone = args.phone.$value;
                    const code = args.code.$value;
                    const client = await Client.findOne({ identification, phone });
                    if (!client) {
                        throw new AppError('Credenciales inválidas, por favor verifique e intente nuevamente', 404, 400);
                    }
                    const payment = await Payment.findOne({ clientIdentification: identification, clientPhone: phone, code });
                    if (!payment) {
                        throw new AppError('El codigo es invalido, por favor verifica e intenta nuevamente', 400, 400);
                    }
                    if (payment.alreadyPaid) {
                        throw new AppError('Este pago ya ha sido confirmado', 400, 400);
                    }
                    if (client.balance < payment.amountToPay) {
                        throw new AppError('Fondos insuficientes, no se pudo realizar el pago', 400, 400);
                    }
                    client.balance = client.balance - payment.amountToPay;
                    await client.save();
                    payment.alreadyPaid = true;
                    await payment.save();
                    return {
                        message: '¡Pago confirmado gracias por utilizar la billetera virtual!'
                    }
                } catch (error) {
                    throw {
                        Fault: {
                            error: error.message ? error.message : "Algo salió mal",
                            errorCode: error.errorCode ? error.errorCode : 500,
                            statusCode: error.statusCode ? error.statusCode : 500
                        }
                    }
                }
            }
        },
    },
};

module.exports = ClientController;