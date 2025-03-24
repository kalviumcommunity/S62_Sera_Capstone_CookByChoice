const express=require('express');
const{
  addMeal,
  getMeals,
  deleteMeal,
  getWeeklyMeals,
} = require("../controllers/mealplanner.controller.js");
const verifyUser =require( "../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/add", verifyUser, addMeal);

router.get("/", verifyUser, getMeals);

router.get("/weekly", verifyUser, getWeeklyMeals);

router.delete("/:mealId", verifyUser, deleteMeal);

module.exports=router
