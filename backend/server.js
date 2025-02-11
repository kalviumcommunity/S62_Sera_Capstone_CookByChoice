const express=require("express")
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const app=express()
const userRoute=require('./routes/user.route')
const recipeRoute=require('./routes/recipe.route')
const ingredientRoute=require('./routes/ingredient.route')
const favouriteRecipe=require('./routes/favourite.route')


app.use(express.json())
app.use(cors())
app.use('/api/users',userRoute)
app.use('/api/recipes',recipeRoute)
app.use('/api/ingredients',ingredientRoute)
app.use('/api/favourite',favouriteRecipe)

mongoose.connect(process.env.DB_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("Error connecting"))



const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})



