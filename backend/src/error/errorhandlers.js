const AppError = require('./AppError');

const logError = (err, req, res, next) => {
    console.error(err);
    next(err);
}

const handleError = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.status).send({ error: err.message, code: err.errorCode });
    }
    next(err);
}

const serverError = (err, req, res, next) => {
    res.status(500).send({ error: 'Something went wrong' });
}

module.exports = {
    logError,
    handleError,
    serverError
}