class AppError extends Error {
    constructor(message, status, error) {
        super();
        this.message = message;
        this.status = status;
        this.errorCode = error;
    }
}

module.exports = AppError;