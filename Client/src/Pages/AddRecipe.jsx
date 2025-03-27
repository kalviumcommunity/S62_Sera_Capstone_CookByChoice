import { useState } from "react";
import axios from "axios";
import DarkBrown from '../assets/darkbrown.webp'

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    category: "",
    cuisineType: "",
    imageUrl: "",
    nutrition: {
      calories: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  const [ingredientInput, setIngredientInput] = useState({ name: "", quantity: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (["calories", "protein", "carbs", "fat"].includes(name)) {
        return {
          ...prev,
          nutrition: { ...prev.nutrition, [name]: value.replace(/\D/g, "") }, // Allow only numbers
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleAddIngredient = () => {
    if (ingredientInput.name.trim() && ingredientInput.quantity.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, { ...ingredientInput }],
      }));
      setIngredientInput({ name: "", quantity: "" });
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!formData.name || !formData.category || !formData.instructions) {
      setMessage({ type: "error", text: "Please fill in all required fields." });
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/recipes/create", formData);
      setMessage({ type: "success", text: "Recipe added successfully!" });
      setFormData({
        name: "",
        ingredients: [],
        instructions: "",
        category: "",
        cuisineType: "",
        imageUrl: "",
        nutrition: { calories: "", protein: "", carbs: "", fat: "" },
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error adding recipe. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="relative flex flex-col items-center justify-center min-h-screen px-4"
  style={{
    backgroundImage: `url(${DarkBrown})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Black translucent overlay */}
  <div className="absolute inset-0 bg-black opacity-30"></div>

  {/* Content */}
  <div className="relative z-10 text-center">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
      Add a New Recipe
    </h2>

    {message && (
      <div
        className={`mb-4 px-4 py-2 rounded-lg text-center ${
          message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
        }`}
      >
        {message.text}
      </div>
    )}

    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 rounded-3xl  max-w-xl w-full transition-all duration-300 transform hover:shadow-xl"
    >
      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
      />
      <br />
      <br />

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">Ingredients</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={ingredientInput.name}
            onChange={(e) => setIngredientInput({ ...ingredientInput, name: e.target.value })}
            placeholder="Ingredient Name"
            className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
          />
          <input
            type="text"
            value={ingredientInput.quantity}
            onChange={(e) => setIngredientInput({ ...ingredientInput, quantity: e.target.value })}
            placeholder="Quantity (e.g., 1 cup, 200g)"
            className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-amber-300 hover:bg-amber-400 px-4 py-2 rounded-lg text-[#5E3023] shadow-md"
          >
            +
          </button>
        </div>
        <br/>

        <ul className="mt-2">
          {formData.ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-1 mt-1 rounded-md w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
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
      </div>

      <textarea
        name="instructions"
        placeholder="Instructions"
        value={formData.instructions}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 mb-4 border border-white rounded-lg text-white"
      ></textarea>

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
      >
        <option className="text-black" value="">Select Category</option>
        <option className="text-black" value="Breakfast">Breakfast</option>
        <option className="text-black" value="Lunch">Lunch</option>
        <option className="text-black" value="Dinner">Dinner</option>
        <option className="text-black" value="Dessert">Dessert</option>
      </select>

      <input
        type="text"
        name="cuisineType"
        placeholder="Cuisine Type"
        value={formData.cuisineType}
        onChange={handleChange}
        className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
        className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
      />
      <br/>
      <br/>

      <h3 className="text-xl font-semibold text-white mb-2">Nutrition Information</h3>
      {["calories", "protein", "carbs", "fat"].map((nutrient) => (
        <input
          key={nutrient}
          type="number"
          name={nutrient}
          placeholder={nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
          value={formData.nutrition[nutrient]}
          onChange={handleChange}
          className="w-full border-b-2 border-white bg-transparent text-white focus:outline-none py-2"
        />
      ))}
      <br/>
      <br/>

      <button
        type="submit"
        className="w-full bg-amber-300 hover:bg-amber-400 text-[#5E3023] px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        Add Recipe
      </button>
    </form>
  </div>
</div>

  );
};

export default AddRecipePage;
