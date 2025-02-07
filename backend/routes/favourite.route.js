const express= require('express')
const router=express.Router()
const addToFavourites=require('../controllers/favourite.controller');

router.post('/create',addToFavourites)

module.exports=router;
