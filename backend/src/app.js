const express = require('express');
require('./db/moongose');
const app = express();
const clientRouter = require('./Client/client.routes');
const { logError, handleError, serverError } = require('./error/errorhandlers');
var cors = require('cors')

app.use(express.json());
app.use(cors());
app.use(clientRouter);

app.use(logError);
app.use(handleError);
app.use(serverError);

module.exports = app;