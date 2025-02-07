const express = require('express');
const router = express.Router();
const addIngredient =require('../controllers/ingredient.controller');


router.post('/create', addIngredient);

module.exports = router;
