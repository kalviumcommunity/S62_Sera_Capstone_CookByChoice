import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react"; // Icon for back button

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!recipe) return <p className="text-center text-red-500">Recipe not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
      <button
        onClick={(e) =>{ 
          navigate(-1)}}
        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition"
      >
        <ArrowLeft size={20} />
        <span className="text-lg font-medium">Back</span>
      </button>

 
      <h1 className="text-4xl font-bold text-gray-900 mt-4">{recipe.name}</h1>
      <p className="text-gray-600 text-lg">{recipe.cuisineType}</p>


      <div className="relative mt-6">
        <img
          src={recipe.imageUrl || "https://via.placeholder.com/600"}
          alt={recipe.name}
          className="w-full h-72 object-cover rounded-xl shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Ingredients</h2>
        <ul className="mt-3 space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
            >
              <span className="text-gray-700">{ingredient.name}</span>
              <span className="font-semibold text-gray-900">{ingredient.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
        <p className="text-gray-700 mt-3 leading-relaxed whitespace-pre-line">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
