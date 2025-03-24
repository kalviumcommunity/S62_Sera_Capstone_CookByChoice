import { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { useParams } from "react-router-dom";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(() => {
    const storedData = localStorage.getItem("setIng");
    return storedData ? new Set(JSON.parse(storedData)) : new Set();
  });
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

if (token) {
  localStorage.setItem("token", token);  // Store in localStorage
  console.log("Token stored in localStorage:", token);
}
  // To save selectedIngredients back to localStorage
  useEffect(() => {
    localStorage.setItem("setIng", JSON.stringify([...selectedIngredients]));
  }, [selectedIngredients]);

  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  console.log(selectedIngredients, JSON.parse(localStorage.getItem("setIng")));
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));

    axios
      .get("http://localhost:5000/api/ingredients")
      .then((response) => setIngredients(response.data))
      .catch((error) => console.error("Error fetching ingredients:", error));
  }, []);

  const handleIngredientChange = (ingredientId) => {
    setSelectedIngredients((prevSelected) => {
      console.log(prevSelected);
      const newSelection = new Set(prevSelected);
      if (newSelection.has(ingredientId)) {
        newSelection.delete(ingredientId);
      } else {
        newSelection.add(ingredientId);
      }
      localStorage.setItem("setIng", JSON.stringify(newSelection));
      console.log(
        selectedIngredients,
        JSON.parse(localStorage.getItem("setIng"))
      );
      return newSelection;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIngredientSearchChange = (event) => {
    setIngredientSearch(event.target.value);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.ingredients.every((ing) => selectedIngredients.has(ing._id)) &&
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-1/4 bg-gray-100 p-10 shadow-md">
        <h3 className="text-xl font-bold text-gray-800">
          Filter by Ingredients
        </h3>
        <input
          type="text"
          placeholder="Search ingredients..."
          value={ingredientSearch}
          onChange={handleIngredientSearchChange}
          className="mt-2 mb-4 p-2 w-full border-2 border-[#5E3023] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]"
        />
        <div className="mt-4">
          {filteredIngredients.map((ingredient) => (
            <div key={ingredient._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`ingredient-${ingredient._id}`}
                className="mr-2"
                checked={selectedIngredients.has(ingredient._id)}
                onChange={() => handleIngredientChange(ingredient._id)}
              />
              <label
                htmlFor={`ingredient-${ingredient._id}`}
                className="text-gray-700"
              >
                {ingredient.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 min-h-screen bg-white w-3/4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          All Recipes
        </h2>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-4 p-2 w-full border-2 border-[#5E3023] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5A2B]"
        />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No recipes match your search criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;
