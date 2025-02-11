const express= require('express')
const router=express.Router()
const {addToFavourites,GetAllFavourites,GetFavouriteById,UpdateFavorite}=require('../controllers/favourite.controller');


router.put('/:id',UpdateFavorite);
router.post('/create',addToFavourites)
router.get('/', GetAllFavourites);
router.get('/:id', GetFavouriteById);

module.exports=router;
