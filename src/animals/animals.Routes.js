const express = require('express');
const router = express.Router();
const { registerAnimals, findAnimalById } = require('./animals.Controller');
const { getAnimals } = require('./animals.Controller');

router.post('/', registerAnimals);
router.get('/', getAnimals);
router.get('/:id', findAnimalById); // Assuming you want to get a specific animal by ID

module.exports = router;
