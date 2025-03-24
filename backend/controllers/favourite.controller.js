const favouriteModel=require('../models/favourite.model');


const addToFavourites = async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.userId; // Get userId from auth middleware

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not logged in" });
        }

        // Check if the recipe is already in favorites
        const existingFavourite = await favouriteModel.findOne({ userId, recipeId });
        if (existingFavourite) {
            return res.status(400).json({ message: "Recipe is already in favorites" });
        }

        // If not, add it to favorites
        const newFavourite = new favouriteModel({ userId, recipeId });
        await newFavourite.save();

        res.status(201).json({ message: "Recipe added to favorites", newFavourite });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};


const GetAllFavourites=async(req,res)=>{
    try {
        const favorites = await favouriteModel.find({userId:req.userId})

        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const GetFavouriteById=async(req,res)=>{
    try {
        const favorite = await favouriteModel.findById(req.params.id).populate('userId recipeId');
        if (!favorite) return res.status(404).json({ message: "Favorite not found" });
        res.status(200).json(favorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const UpdateFavorite=async(req,res)=>{
    try {
        const updatedFavorite = await favouriteModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFavorite) return res.status(404).json({ message: "Favorite not found" });
        res.status(200).json(updatedFavorite);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const DeleteFavourite = async (req, res) => {
    try {
        const  recipeId  = req.params.id;  // Extract recipeId from request parameters
        const userId = req.userId;  // Assuming userId is available from authentication middleware
        console.log(recipeId)
        if (!recipeId) {
            return res.status(400).json({ message: "Recipe ID is required" });
        }

        
        const favourite = await favouriteModel.findOne({ recipeId, userId });

        if (!favourite) {
            return res.status(404).json({ message: "Favourite recipe not found or not owned by user" });
        }

    
        await favouriteModel.findByIdAndDelete(favourite._id);

        res.status(200).json({ message: "Favourite recipe deleted successfully" });

    } catch (error) {
        console.error("Error deleting favourite:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports={addToFavourites,GetAllFavourites,GetFavouriteById,UpdateFavorite,DeleteFavourite};