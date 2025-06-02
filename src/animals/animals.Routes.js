const express = require('express');
const router = express.Router();
const { registerAnimals } = require('./animals.Controller');
const { getAnimals } = require('./animals.Controller');

router.post('/', registerAnimals);
router.get('/', getAnimals);


module.exports = router;
