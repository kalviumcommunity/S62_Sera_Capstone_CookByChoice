const express = require('express');
const router = express.Router();
const {addIngredient,GetAllIngredients,GetIngredientById,UpdateIngredient} =require('../controllers/ingredient.controller');



router.put('/:id',UpdateIngredient)
router.post('/create', addIngredient);
router.get('/', GetAllIngredients);
router.get('/:id', GetIngredientById);

module.exports = router;
