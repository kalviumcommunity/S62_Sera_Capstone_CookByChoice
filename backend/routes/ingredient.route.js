const express = require('express');
const router = express.Router();
const {addIngredient,GetAllIngredients,GetIngredientById,UpdateIngredient} =require('../controllers/ingredient.controller');


router.post('/create', addIngredient);
router.get('/', GetAllIngredients);
router.get('/:id', GetIngredientById);
router.put('/:id',UpdateIngredient)

module.exports = router;
