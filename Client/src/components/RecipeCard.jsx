import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const [isMealPlannerOpen, setIsMealPlannerOpen] = useState(false);
  const [mealType, setMealType] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleAddToFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/favourite/create?token=${token}`,
        {
          recipeId: recipe._id,
        }
      );

      alert(response.data.message);
      setIsAddedToFavorites(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to favorites");
    }
  };

  const handleSaveToPlanner = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      if (!mealType || !date) {
        alert("Please fill in all fields.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/meal-planner/add?token=${token}`,
        {
          recipeId: recipe._id,
          mealType,
          date,
        }
      );

      alert(response.data.message);
      setIsMealPlannerOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to planner");
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
  const handleCardClick = (e) => {
    // Prevent navigation when clicking a button
    if (e.target.tagName.toLowerCase() !== "button") {
      navigate(`/recipe/${recipe._id}`);
    }
  };

  return (

    <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-[#5E3023] transform transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col justify-between" onClick={handleCardClick} >
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
      

      {/* Bottom Section: Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        {/* Add to Favorites Button */}
        <button
          onClick={handleAddToFavorites}
          className={`w-full px-4 py-2 rounded-lg transition text-white font-semibold
            ${isAddedToFavorites ? "bg-amber-500 cursor-not-allowed" : "bg-amber-300 hover:bg-amber-400"}`}
          disabled={isAddedToFavorites}
        >
          {isAddedToFavorites ? "Added to Favorites" : "Add to Favorites 🤎"}
        </button>

        {/* Add to Planner Button */}
        <button
          onClick={() => setIsMealPlannerOpen(true)}
          className="w-full px-4 py-2 rounded-lg transition text-white font-semibold bg-amber-400 hover:bg-amber-500"
        >
          Add to Meal Planner 📅
        </button>

        {/* Edit and Delete Buttons */}
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


      {/* Meal Planner Popup */}
      {isMealPlannerOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md" >
   <div
            className="bg-white bg-opacity-90 p-6 rounded-lg shadow-xl w-80"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
      <h2 className="text-lg font-bold text-gray-800 text-center">Add to Meal Planner</h2>

      <div className="mt-3">
        <label className="block text-sm font-semibold text-gray-700">Meal Type:</label>
        <select
          className="w-full mt-1 p-2 border rounded-lg"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="">Select Meal Type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <div className="mt-3">
        <label className="block text-sm font-semibold text-gray-700">Date:</label>
        <input
          type="date"
          className="w-full mt-1 p-2 border rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          onClick={handleSaveToPlanner}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          onClick={() => setIsMealPlannerOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default RecipeCard;
