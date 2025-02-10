const express= require('express')
const router=express.Router()
const {addToFavourites,GetAllFavourites,GetFavouriteById,UpdateFavorite}=require('../controllers/favourite.controller');

router.post('/create',addToFavourites)
router.get('/', GetAllFavourites);
router.get('/:id', GetFavouriteById);
router.put('/:id',UpdateFavorite);

module.exports=router;
