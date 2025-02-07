const express = require('express');
const router = express.Router();
const createRecipe =require( '../controllers/recipe.controller');


router.post('/create',createRecipe)

module.exports = router;
