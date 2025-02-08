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

const GetAllRecipes=async(req,res)=>{
  try {
    const recipes = await Recipe.find().populate('ingredients');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
}
}

const GetRecipeById=async(req,res)=>{
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
}
}
module.exports={createRecipe,GetAllRecipes,GetRecipeById};
