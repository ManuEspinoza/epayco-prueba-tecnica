const registerClient = async (req, res, next) => {
    res.send("registrar usuario");
}

const addClientBalance = async (req, res, next) => {
    res.send("agregar fondos");
}

const getClientBalance = async (req, res, next) => {
    res.send("obtener fondos");
}

module.exports = {
    registerClient,
    addClientBalance,
    getClientBalance
}