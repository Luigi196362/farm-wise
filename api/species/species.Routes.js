const express = require('express');
const router = express.Router();
const { registerSpecies } = require('./species.Controller');
const { getSpecies } = require('./species.Controller');

router.post('/', registerSpecies);
router.get('/', getSpecies);

module.exports = router;
