const express = require('express');
const randomController = require('../controllers/random.controller');

const router = express.Router();

router.get('/', randomController.randomMeals);
router.get('/options', randomController.randomOptions);

module.exports = router;
