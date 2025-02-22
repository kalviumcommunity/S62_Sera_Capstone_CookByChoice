const express = require('express');
const router = express.Router();
const {createRecipe,GetAllRecipes,GetRecipeById,UpdateRecipe,DeleteRecipe} =require( '../controllers/recipe.controller');
const { route } = require('./user.route');



router.put('/:id',UpdateRecipe)
router.post('/create',createRecipe)
router.get('/', GetAllRecipes);
router.get('/:id', GetRecipeById);
router.delete('/:id',DeleteRecipe)


module.exports = router;
