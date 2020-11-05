const express = require('express');
require('./db/moongose');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello world!");
});

module.exports = app;