const express = require('express');
const app = express();
const clientRouter = require('./client/client.routes');
const { logError, handleError, serverError } = require('./error/errorHandlers');
var cors = require('cors');
const soap = require('soap');
const xml = 'myservice.wsdl';

app.use(express.json());
app.use(cors());
app.use(clientRouter);

app.use(logError);
app.use(handleError);
app.use(serverError);

const args = {
    name: {
        attributes: { 'xsi:type': 'xsd:string' },
        $value: "Manuel"
    },
    email: {
        attributes: { 'xsi:type': 'xsd:string' },
        $value: "manuel4221121@example.com"
    },
    phone: {
        attributes: { 'xsi:type': 'xsd:string' },
        $value: "042414011122"
    },
    identification: {
        attributes: { 'xsi:type': 'xsd:number' },
        $value: 252051111
    }
}

module.exports = app;
app.get('/', (req, res) => {
    soap.createClientAsync(xml).then((client) => {
        return client.registerClientAsync(args);
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log("Aqui")
        console.log(err);
    });
    // soap.createClient(xml, function (err, client) {
    //     client.registerClient(args, function (err, result) {
    //         console.log(result);
    //     });
    // });
    res.send('Hola');
});