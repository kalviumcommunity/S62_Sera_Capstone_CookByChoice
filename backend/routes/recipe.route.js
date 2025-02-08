const express = require('express');
const router = express.Router();
const {createRecipe,GetAllRecipes,GetRecipeById} =require( '../controllers/recipe.controller');


router.post('/create',createRecipe)
router.get('/', GetAllRecipes);
router.get('/:id', GetRecipeById);


module.exports = router;
