const favouriteModel=require('../models/favourite.model');
const addToFavourites=async(req,res)=>{
    try{
        const {userId,recipeId}=req.body;
        const newFavourite=new favouriteModel({userId,recipeId})
        await newFavourite.save();
        res.status(201).json({message:"Recipe added to favourites",newFavourite})

    }catch(err){
        console.error(err)
        res.status(500).json({message:"Server error"})
    }
}

const GetAllFavourites=async(req,res)=>{
    try {
        const favorites = await favouriteModel.find().populate('userId recipeId');
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
module.exports={addToFavourites,GetAllFavourites,GetFavouriteById};