import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import RecipesPage from "./Pages/Recipe";
import AddRecipePage from "./Pages/AddRecipe";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FavoritePage from "./Pages/Favourite";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-pastel-blue">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/favorites" element={< FavoritePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
