const express = require('express');
const router = express.Router();
const {addIngredient,GetAllIngredients,GetIngredientById} =require('../controllers/ingredient.controller');


router.post('/create', addIngredient);
router.get('/', GetAllIngredients);
router.get('/:id', GetIngredientById);

module.exports = router;
