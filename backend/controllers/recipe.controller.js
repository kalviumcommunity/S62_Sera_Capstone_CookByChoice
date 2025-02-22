const Recipe = require("../models/recipe.model");
const Ingredient = require("../models/ingredient.model.js");
const { default: mongoose } = require("mongoose");

const createRecipe = async (req, res) => {
  try {
    const {
      name,
      ingredients,
      instructions,
      category,
      cuisineType,
      imageUrl,
      nutrition,
    } = req.body;
    console.log(req.body);

    if (!name || !instructions) {
      return res
        .status(400)
        .json({ message: "Recipe name and instructions are required" });
    }

    // Ensure ingredients is an array and handle ingredient objects correctly
    const ingredientStorage = ingredients?.map(async (ingredientData) => {
      let ingredient = await Ingredient.findOne({
        name: ingredientData.name,
      });

      if (!ingredient) {
        ingredient = new Ingredient({
          name: ingredientData.name,
          quantity: ingredientData.quantity || "",
        });
        await ingredient.save();
      }

      return ingredient._id;
    });
    const ingredientIds = await Promise.all(ingredientStorage);
    console.log(ingredientIds);

    const newRecipe = new Recipe({
      name,
      ingredients: ingredientIds,
      instructions,
      category,
      cuisineType,
      imageUrl,
      nutrition,
    });

    await newRecipe.save();

    return res
      .status(201)
      .json({ message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

const GetAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("ingredients");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("ingredients");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const UpdateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe)
      return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a recipe by ID
const DeleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the recipe exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createRecipe,
  GetAllRecipes,
  GetRecipeById,
  UpdateRecipe,
  DeleteRecipe,
};
