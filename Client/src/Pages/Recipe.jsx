import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";


const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes")
      .then(response => setRecipes(response.data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-2xl font-bold text-center text-gray-800">All Recipes</h2>
      <br/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      
    </div>
  );
};

export default RecipesPage;
