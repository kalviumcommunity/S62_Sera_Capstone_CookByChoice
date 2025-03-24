const mongoose=require('mongoose')

const mealPlannerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meals: [
    {
      recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
      },
      mealType: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MealPlanner = mongoose.model("MealPlanner", mealPlannerSchema);

module.exports=MealPlanner;
