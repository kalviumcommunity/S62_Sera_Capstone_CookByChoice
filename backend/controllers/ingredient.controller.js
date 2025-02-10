const Ingredient = require('../models/ingredient.model');

// POST: Add a new ingredient
const addIngredient = async (req, res) => {
    try {
        const { name, quantity } = req.body;

        const newIngredient = new Ingredient({
            name,
            quantity
        });

        await newIngredient.save();
        res.status(201).json({ message: 'Ingredient added successfully', newIngredient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const GetAllIngredients=async(req,res)=>{
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const GetIngredientById=async(req,res)=>{
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) return res.status(404).json({ message: "Ingredient not found" });
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const UpdateIngredient = async (req, res) => {
    try {
        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIngredient) return res.status(404).json({ message: "Ingredient not found" });
        res.status(200).json(updatedIngredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports={addIngredient,GetAllIngredients,GetIngredientById,UpdateIngredient};
