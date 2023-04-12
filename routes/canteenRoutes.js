const express = require('express');
const router = express.Router();
const { canteenRegister, canteenLogin } = require('../controllers/canteenController');

router.post('/register', canteenRegister);
router.post('/login', canteenLogin);

module.exports = router;
