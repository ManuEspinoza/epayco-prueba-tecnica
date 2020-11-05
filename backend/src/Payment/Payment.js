const { Schema, model } = require('mongoose');
const PaymentSchema = new Schema({
    clientIdentification: {
        type: Number,
        required: true
    },
    clientPhone: {
        type: String,
        required: true, 
    },
    code: {
        type: Number,
        required: true, 
    },
    amountToPay: {
        type: Number,
        required: true, 
    },
    alreadyPaid: {
        type: Boolean,
        default: false
    }
})

PaymentSchema.methods.toJSON = function () {
    const payment = this;
    const paymentObject = payment.toObject();

    delete paymentObject.code;
    delete paymentObject.alreadyPaid;

    return paymentObject;
}

const Payment = model('Payment', PaymentSchema);

module.exports = Payment;