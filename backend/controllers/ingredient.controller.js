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
module.exports=addIngredient;
