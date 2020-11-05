const { Router } = require('express');
const router = Router();
const clientController = require('./client.controller');

router.post('/register', clientController.registerClient);
router.post('/balance', clientController.addClientBalance);
router.get('/balance', clientController.getClientBalance);

module.exports = router;