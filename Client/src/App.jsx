import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import RecipesPage from "./Pages/Recipe";
import AddRecipePage from "./Pages/AddRecipe";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FavoritePage from "./Pages/Favourite";
import UpdateRecipe from "./Pages/UpdateRecipe";
import { useState } from "react";
import MealPlanner from "./components/MealCalendar";
import RecipeDetail from './Pages/RecipeDetail'
// import MealCalendar from "./components/MealCalendar";

const App = () => {
  const [isAdded,setIsAdded]=useState(false)
  return (
    
    <Router>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        </Routes> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/favorites" element={< FavoritePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/update-recipe/:id" element={<UpdateRecipe />} />
          <Route path='/calender' element={<MealPlanner/>}/>
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
        <Footer/>

    </Router>
  );
};

export default App;
