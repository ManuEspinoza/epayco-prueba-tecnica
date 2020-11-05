const express = require('express');
require('./db/moongose');
const app = express();
const clientRouter = require('./Client/client.routes');

app.use(express.json());
app.use(clientRouter);

module.exports = app;