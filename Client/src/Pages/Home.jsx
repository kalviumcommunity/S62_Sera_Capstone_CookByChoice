import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Adjust the path based on your folder structure

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-[#F3E9DC] to-[#F3E9DC] ">
      {/* <div className="bg-blue-950 p-8 sm:p-12 rounded-3xl shadow-2xl text-center max-w-2xl w-full transition-all duration-300 transform hover:shadow-xl border border-amber-300"> */}
        
        <img src={Logo} alt="CookByChoice Logo" className="w-56 sm:w-56 h-56 sm:h-56 mx-auto mb-6" />

        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#5E3023]">CookByChoice</h1>
        <p className="text-lg sm:text-2xl text-[#895737] mt-4">
          Discover, create, and share your favorite recipes with ease.
        </p>

        <div className="mt-8">
          <Link
            to="/recipes"
            className="inline-block bg-amber-300 hover:bg-amber-400 text-[#5E3023] px-8 py-4 text-lg font-semibold rounded-xl shadow-lg 
            transition-transform duration-300 transform hover:scale-110"
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    // </div>
  );
};

export default HomePage;
