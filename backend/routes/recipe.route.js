const express = require('express');
const router = express.Router();
const {createRecipe,GetAllRecipes,GetRecipeById,UpdateRecipe} =require( '../controllers/recipe.controller');



router.put('/:id',UpdateRecipe)
router.post('/create',createRecipe)
router.get('/', GetAllRecipes);
router.get('/:id', GetRecipeById);


module.exports = router;
