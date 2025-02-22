import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("token"); 
  
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
      
      const response = await axios.post(
        `http://localhost:5000/api/favourite/create?token=${token}`, // Send token in query params
        {
          recipeId: recipe._id,
        }
      );
  
      alert(response.data.message); 
      setIsAdded(true); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to favorites");
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      alert("Recipe deleted successfully.");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-[#5E3023] transform transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col justify-between">
      {/* Recipe Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <img
          src={recipe.imageUrl || "https://via.placeholder.com/300"}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-xl"
        />
        {recipe.category && (
          <span className="absolute top-2 right-2 bg-amber-400 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            {recipe.category}
          </span>
        )}
      </div>

      {/* Recipe Details */}
      <h3 className="text-xl font-bold text-gray-800 mt-3">{recipe.name}</h3>
      {recipe.cuisineType && <p className="text-sm text-gray-600">{recipe.cuisineType}</p>}

      {/* Ingredients Section */}
      {recipe.ingredients?.length > 0 && (
        <div className="mt-3">
          <h4 className="text-md font-semibold text-gray-700">Ingredients:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} - <span className="font-semibold">{ingredient.quantity}</span>
              </li>
            ))}
          </ul>
          {recipe.ingredients.length > 3 && (
            <p className="text-sm text-gray-500 italic mt-1">+ more...</p>
          )}
        </div>
      )}

      {/* Instructions Section */}
      {recipe.instructions && (
        <div className="mt-3">
          <h4 className="text-md font-semibold text-gray-700">Instructions:</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{recipe.instructions}</p>
        </div>
      )}

      {/* Bottom Section: Nutrition + Add Button */}
      <div className="mt-4">
        {/* Nutrition Info */}
        {recipe.nutrition && (
          <div className="p-3 bg-amber-100 rounded-lg shadow-inner">
            <h4 className="text-sm font-semibold text-gray-700">Nutrition Info:</h4>
            <div className="grid grid-cols-2 text-xs text-gray-600 mt-1">
              <p>Calories: <span className="font-semibold">{recipe.nutrition.calories || 0}</span> kcal</p>
              <p>Protein: <span className="font-semibold">{recipe.nutrition.protein || 0}</span>g</p>
              <p>Carbs: <span className="font-semibold">{recipe.nutrition.carbs || 0}</span>g</p>
              <p>Fat: <span className="font-semibold">{recipe.nutrition.fat || 0}</span>g</p>
            </div>
          </div>
        )}

        {/* Buttons Section */}
        <div className="flex flex-col mt-4 gap-2">
          <button
            onClick={handleAddToFavorites}
            className={`w-full px-4 py-2 rounded-lg transition text-white font-semibold
              ${isAdded ? "bg-amber-500 cursor-not-allowed" : "bg-amber-300 hover:bg-amber-400"}`}
            disabled={isAdded}
          >
            {isAdded ? "Added to Favorites" : "Add to Favorites 🤎"}
          </button>

          <div className="flex justify-between gap-2">
            <button
              onClick={() => navigate(`/update-recipe/${recipe._id}`)}
              className="w-1/2 bg-[#5E3023] text-white px-4 py-2 rounded-lg hover:bg-[#8B5A2B] transition"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(recipe._id)}
              className="w-1/2 bg-[#8B5A2B] text-white px-4 py-2 rounded-lg hover:bg-[#5E3023] transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
