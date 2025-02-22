import React from "react";
import axios from "axios";

const FavouriteCard = ({ recipe }) => {
  const handleRemove = async (recipeId) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage

        if (!token) {
            alert("User not authenticated. Please log in.");
            return;
        }

        // Send token as a query parameter
        await axios.delete(`http://localhost:5000/api/favourite/${recipeId}?token=${token}`);

        alert("Recipe removed from favorites!");
        window.location.reload(); // Refresh to reflect changes
    } catch (error) {
        console.error("Error removing recipe:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to remove recipe. Try again.");
    }
};



  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-[#5E3023] transform transition-all duration-300 hover:shadow-2xl hover:scale-105 relative">
    
      <div className="relative w-full h-48 rounded-xl overflow-hidden">
        <img
          src={recipe.imageUrl || "https://via.placeholder.com/300"}
          alt={recipe.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <span className="absolute top-2 right-2 bg-amber-300 text-[#5E3023] text-xs font-semibold px-2 py-1 rounded-md shadow-md">
          {recipe.category}
        </span>
      </div>

      
      <h3 className="text-xl font-bold text-gray-800 mt-3">{recipe.name}</h3>
      <p className="text-sm text-gray-600">{recipe.cuisineType}</p>

     
      {recipe.nutrition && (
        <div className="mt-3 p-3 bg-amber-100 rounded-lg shadow-inner">
          <h4 className="text-sm font-semibold text-gray-700">Nutrition Info:</h4>
          <div className="grid grid-cols-2 text-xs text-gray-600 mt-1">
            <p>Calories: <span className="font-semibold">{recipe.nutrition.calories || 0}</span> kcal</p>
            <p>Protein: <span className="font-semibold">{recipe.nutrition.protein || 0}</span>g</p>
            <p>Carbs: <span className="font-semibold">{recipe.nutrition.carbs || 0}</span>g</p>
            <p>Fat: <span className="font-semibold">{recipe.nutrition.fat || 0}</span>g</p>
          </div>
        </div>
      )}

      
      <button
        className="mt-4 w-full px-4 py-2 rounded-lg bg-amber-300 text-[#5E3023] hover:bg-amber-400 transition"
        onClick={() => handleRemove(recipe._id)}
      >
        Remove from Favourites
      </button>
    </div>
  );
};

export default FavouriteCard;
