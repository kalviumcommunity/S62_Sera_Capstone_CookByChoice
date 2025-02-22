import { useState, useEffect } from "react";
import axios from "axios";
import FavouriteCard from "../components/FavouriteCard";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Fetch favorite recipes list
        const { data: favouriteList } = await axios.get("http://localhost:5000/api/favourite");
        console.log("Favourite List:", favouriteList); // Debugging

        if (!favouriteList || favouriteList.length === 0) {
          setFavorites([]);
          return;
        }

        // Extract recipe IDs correctly
        const recipeIds = favouriteList.map((fav) => {
          console.log(fav.recipeId);
          return fav.recipeId;
        }); // Extract _id from recipeId
        console.log("Extracted Recipe IDs:", recipeIds); // Debugging

        // Fetch full details of each recipe
        const recipeRequests = recipeIds?.map((id) =>
          axios.get(`http://localhost:5000/api/recipes/${id}`)
        );
        const recipeResponses = await Promise.all(recipeRequests);
        console.log("requests",recipeResponses)

        const recipeData = recipeResponses.map((res) => res.data);

        console.log("Fetched Recipe Data:", recipeData); // Debugging
        setFavorites(recipeData);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#F3E9DC] flex flex-col items-center">
      <h2 className="text-3xl font-bold text-[#5E3023] mb-4">Your Favorite Recipes 🍽️</h2>

      {loading ? (
        <p className="text-lg text-[#5E3023]">Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p className="text-lg text-[#5E3023] mt-4">No favorites added yet. Explore and save your favorites!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {favorites.map((recipe) => (
            <div key={recipe._id} className="bg-white p-5 rounded-xl shadow-lg border-2 border-[#5E3023] transform transition-all duration-300 hover:shadow-2xl hover:scale-105 relative">
              <FavouriteCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
