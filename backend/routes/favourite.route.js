const express= require('express')
const router=express.Router()
const {addToFavourites,GetAllFavourites,GetFavouriteById}=require('../controllers/favourite.controller');

router.post('/create',addToFavourites)
router.get('/', GetAllFavourites);
router.get('/:id', GetFavouriteById);

module.exports=router;
