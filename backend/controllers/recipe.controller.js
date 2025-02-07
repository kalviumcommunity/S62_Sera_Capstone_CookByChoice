const Recipe = require('../models/recipe.model')


const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, category, cuisineType, imageUrl, nutrition } = req.body;

    
    if (!name || !instructions) {
      return res.status(400).json({ message: 'Recipe name and instructions are required' });
    }

  
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
      category,
      cuisineType,
      imageUrl,
      nutrition
    });

    await newRecipe.save();

    return res.status(201).json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
module.exports=createRecipe
