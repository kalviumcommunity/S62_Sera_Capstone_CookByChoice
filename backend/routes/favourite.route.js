const express= require('express')
const router=express.Router()
const {addToFavourites,GetAllFavourites,GetFavouriteById,UpdateFavorite,DeleteFavourite}=require('../controllers/favourite.controller');
const verifyUser=require('../middlewares/authMiddleware')

router.put('/:id',UpdateFavorite);
router.post('/create',verifyUser,addToFavourites)
router.get('/', GetAllFavourites);
router.get('/:id', GetFavouriteById);
router.delete('/:id',verifyUser,DeleteFavourite)

module.exports=router;
