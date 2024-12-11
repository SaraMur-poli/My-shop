const express = require('express');
const router = express.Router();

const Controller = require('../controllers/product');

router.post('/register', Controller.register);

module.exports = router;