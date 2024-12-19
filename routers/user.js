const express = require('express');
const router = express.Router();

const Controller = require('../controllers/user');

router.post('/login', Controller.login);
router.post('/register', Controller.register);

module.exports = router;