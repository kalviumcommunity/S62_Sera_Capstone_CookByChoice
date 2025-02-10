const express = require('express');
const router = express.Router();
const {createRecipe,GetAllRecipes,GetRecipeById,UpdateRecipe} =require( '../controllers/recipe.controller');


router.post('/create',createRecipe)
router.get('/', GetAllRecipes);
router.get('/:id', GetRecipeById);
router.put('/:id',UpdateRecipe)


module.exports = router;
