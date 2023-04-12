const express = require('express');
const router = express.Router();
const { clientRegister, clientLogin } = require('../controllers/clientController');

router.post('/register', clientRegister);
router.post('/login', clientLogin);

module.exports = router;
