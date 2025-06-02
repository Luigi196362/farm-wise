const express = require('express');
const router = express.Router();
const { register } = require('./auth.Controller');
const { login } = require('./auth.Controller');

router.post('/login', login);
router.post('/register', register);

module.exports = router;
