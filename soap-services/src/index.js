require('./db/epayco-db');
const xml = require('fs').readFileSync('myservice.wsdl', 'utf8');
const express = require('express');
const soap = require('soap');
var app = express();
const clientService = require('./client/client.controller');

app.listen(8001, function () {
    soap.listen(app, '/wsdl', clientService, xml, function () {
        console.log('server initialized');
    });
});