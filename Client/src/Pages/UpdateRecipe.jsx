import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateRecipe = () => {
  const { id } = useParams();
  const [ingInput,setIngInput] = useState([])
  const navigate = useNavigate();
  const [ingredientInput, setIngredientInput] = useState(
    { _id: "", name: "", quantity: "" },
  );
  //   console.log(ingredientInput);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    category: "",
    cuisineType: "",
    imageUrl: "",
    nutrition: { calories: "", protein: "", carbs: "", fat: "" },
  });

  //   const [availableIngredients, setAvailableIngredients] = useState([]);

  // Fetch recipe details and available ingredients
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/recipes/${id}`)
      .then((response) => {
        // Extract recipe data from the response
        const recipeData = response.data;
        setRecipe({ ...recipeData }); // Set the entire recipe data, including ingredients

        // If there are ingredients, set them to ingredientInput as an array of objects
        
          setIngInput(recipeData.ingredients); // Set ingredients as an array
        
      })
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, [id]);
 
  

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("nutrition.")) {
      const field = name.split(".")[1];
      setRecipe((prev) => ({
        ...prev,
        nutrition: { ...prev.nutrition, [field]: value },
      }));
    } else {
      setRecipe((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddIngredient = async () => {
    if (ingredientInput.name.trim() && ingredientInput.quantity.trim()) {
      try {
        // Send the new ingredient to the server
        const response = await axios.post("http://localhost:5000/api/ingredients/create", ingredientInput);
        const newIngredient = response.data.newIngredient;
        console.log(newIngredient, "ab");
  
        // Update the recipe's ingredients state by adding the new ingredient
        setRecipe((prev) => {
          const updatedIngredients = [...prev.ingredients, newIngredient]; // Add the new ingredient
          return { ...prev, ingredients: updatedIngredients }; // Return updated recipe state
        });
  
        
        const updatedRecipe = { ...recipe, ingredients: [...recipe.ingredients, newIngredient] };
        await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
  
        // Reset the ingredient input fields after successfully adding an ingredient
        setIngredientInput({ name: "", quantity: "" });
      } catch (error) {
        console.error("Error adding ingredient:", error);
      }
    } else {
      console.error("Ingredient name or quantity is missing");
    }
  };
  
  const handleRemoveIngredient = async (index) => {
    try {
      
      const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
  
      axios.put
      setRecipe((prev) => ({
        ...prev,
        ingredients: updatedIngredients,
      }));
  
      
      const updatedRecipe = { ...recipe, ingredients: updatedIngredients };
      await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
  
    } catch (error) {
      console.error("Error removing ingredient:", error);
    }
  };
  

  const handleRecipeUpdate = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/recipes/${id}`, recipe)
      .then(() => {
        alert("Recipe updated successfully!");
        navigate("/recipes");
      })
      .catch((error) => console.error("Error updating recipe:", error));
  };
  console.log(recipe);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Update Recipe</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <form onSubmit={handleRecipeUpdate} className="w-full">
          <p>Name:</p>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Recipe Name"
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <label className="block text-gray-700 font-semibold">
            Ingredients:
          </label>
          <div className="flex gap-2">
            
            <input
              type="text"
              value={ingredientInput.name}
              onChange={(e) =>
                setIngredientInput({ ...ingredientInput, name: e.target.value })
              }
              placeholder="Ingredient Name"
              className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300"
            />
            <input
              type="text"
              value={ingredientInput.quantity}
              onChange={(e) =>
                setIngredientInput({
                  ...ingredientInput,
                  quantity: e.target.value,
                })
              }
              placeholder="Quantity (e.g., 1 cup, 200g)"
              className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-300"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-amber-300 hover:bg-amber-400 px-4 py-2 rounded-lg text-[#5E3023] shadow-md"
            >
              +
            </button>
          </div>

          <ul className="mt-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-3 py-1 mt-1 rounded-md"
              >
                {ingredient.name} - {ingredient.quantity}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <p>Instructions:</p>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            placeholder="Instructions"
            required
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
          <p>Category:</p>
          <select
            name="category"
            value={recipe.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-4 border rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-amber-300"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
          <p>Cuisine Type:</p>
          <input
            type="text"
            name="cuisineType"
            value={recipe.cuisineType}
            onChange={handleChange}
            placeholder="Cuisine Type"
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <p>Image URL:</p>
          <input
            type="text"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <p>Calories:</p>
            <input
              type="number"
              name="nutrition.calories"
              value={recipe.nutrition.calories}
              onChange={handleChange}
              placeholder="Calories"
              className="p-2 border rounded"
            />
            <p>Protein:</p>
            <input
              type="number"
              name="nutrition.protein"
              value={recipe.nutrition.protein}
              onChange={handleChange}
              placeholder="Protein (g)"
              className="p-2 border rounded"
            />
            <p>Carbs:</p>
            <input
              type="number"
              name="nutrition.carbs"
              value={recipe.nutrition.carbs}
              onChange={handleChange}
              placeholder="Carbs (g)"
              className="p-2 border rounded"
            />
            <p>Fat:</p>
            <input
              type="number"
              name="nutrition.fat"
              value={recipe.nutrition.fat}
              onChange={handleChange}
              placeholder="Fat (g)"
              className="p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
