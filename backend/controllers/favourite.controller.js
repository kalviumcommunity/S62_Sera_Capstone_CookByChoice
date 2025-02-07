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
module.exports=addToFavourites;