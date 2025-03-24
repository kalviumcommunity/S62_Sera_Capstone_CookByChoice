const MealPlanner=require("../models/mealplanner.model.js");
const Recipe=require( "../models/recipe.model.js");

// Add a meal to the planner
const addMeal = async (req, res) => {
  try {
    const { recipeId, mealType, date } = req.body;
    const userId = req.userId; // Assuming user is authenticated via middleware

    // Check if recipe exists
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Find or create a meal planner entry for the user
    let mealPlan = await MealPlanner.findOne({ user: userId });

    if (!mealPlan) {
      mealPlan = new MealPlanner({ user: userId, meals: [] });
    }

    // Add meal entry
    mealPlan.meals.push({ recipe: recipeId, mealType, date });
    await mealPlan.save();

    res.status(201).json({ message: "Meal added to planner", mealPlan });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all meals for a user
const getMeals = async (req, res) => {
  try {
    const userId = req.userId;

    const mealPlan = await MealPlanner.findOne({ user: userId }).populate("meals.recipe");
    
    if (!mealPlan) {
      return res.status(404).json({ message: "No meal planner found" });
    }

    res.status(200).json(mealPlan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a meal from the planner
const deleteMeal = async (req, res) => {
  try {
    const { mealId } = req.params;
    const userId = req.userId;

    const mealPlan = await MealPlanner.findOne({ user: userId });

    if (!mealPlan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    // Remove the meal
    mealPlan.meals = mealPlan.meals.filter((meal) => meal._id.toString() !== mealId);
    await mealPlan.save();

    res.status(200).json({ message: "Meal deleted successfully", mealPlan });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getWeeklyMeals = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const userId = req.userId; // Extracted from authentication middleware
  
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start and end dates are required." });
      }
  
      const mealPlans = await MealPlanner.findOne({ user: userId }).populate("meals.recipe");
  
      if (!mealPlans || !mealPlans.meals.length) {
        return res.status(404).json({ message: "No meals found for this user." });
      }
      console.log(mealPlans)
      // Filter meals within the date range
      const mealsByDate = {};
      mealPlans.meals.forEach((meal) => {
        const mealDate = meal.date.toISOString().split("T")[0];
        if (mealDate >= startDate && mealDate <= endDate) {
          if (!mealsByDate[mealDate]) mealsByDate[mealDate] = [];
          mealsByDate[mealDate].push({
            _id: meal._id,
            name: meal.recipe?.name || "Unknown",
            details: meal.recipe?.description || "No description available",
            mealType: meal.mealType,
            recipeId:meal.recipe._id
          });
        }
      });
      console.log(mealsByDate)
  
      res.json(mealsByDate);
    } catch (error) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



module.exports={addMeal,getMeals,deleteMeal,getWeeklyMeals}
