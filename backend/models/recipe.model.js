const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    instructions: { type: String, required: true },
    category: { type: String },
    cuisineType: { type: String },
    imageUrl: { type: String },
    nutrition: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fat: Number
    }
}, { timestamps: true });

module.exports = mongoose.model('Recipe',recipeSchema)
