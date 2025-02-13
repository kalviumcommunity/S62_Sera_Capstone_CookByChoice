const Recipe = require('../models/recipe.model')
const Ingredient=require('../models/ingredient.model.js')




const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, instructions, category, cuisineType, imageUrl, nutrition } = req.body;
    console.log(req.body);

    if (!name || !instructions) {
      return res.status(400).json({ message: 'Recipe name and instructions are required' });
    }

    // Ensure ingredients is an array and handle ingredient objects correctly
    const ingredientIds = await Promise.all(
      ingredients?.map(async (ingredientData) => {
        let ingredient = await Ingredient.findOne({ name: ingredientData.name });

        if (!ingredient) {
          ingredient = new Ingredient({ name: ingredientData.name, quantity: ingredientData.quantity || '' });
          await ingredient.save();
        }

        return ingredient._id;
      })
    );

    const newRecipe = new Recipe({
      name,
      ingredients: ingredientIds,
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
    return res.status(500).json({ message: 'Server error', error });
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
};
const UpdateRecipe=async(req,res)=>{
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(updatedRecipe);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}
module.exports={createRecipe,GetAllRecipes,GetRecipeById,UpdateRecipe};
