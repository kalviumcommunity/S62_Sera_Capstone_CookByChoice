import { Link } from "react-router-dom";
import Logo from "../assets/logo.png"; // Adjust the path based on your folder structure
import Background from '../assets/Background.jpg'
const HomePage = () => {
  return (
    <div className="bg-[#fdf6ec] min-h-screen ">
      {/* Hero Section */}
      <div
  className="relative w-full h-[60vh] bg-cover bg-center"
  style={{ backgroundImage: `url(${Background})` }} // ✅ Local image as background
>
  {/* ✅ Black translucent overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* ✅ Content on top of the overlay */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
    <h1 className="text-5xl font-bold">CookByChoice</h1>
    <p className="text-lg mt-3">
      Discover delicious recipes made with fresh ingredients
    </p>
    <Link
      to="/recipes"
      className="mt-5 px-6 py-3 bg-[#ff8c42] text-white font-semibold rounded-lg shadow-md hover:bg-[#e07b3c]"
    >
      Explore Now
    </Link>
  </div>
</div>

      
      
      {/* Sections */}
      <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recipes Box */}
        <Link to="/recipes" className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl">
        <div className="relative w-full h-60">
        <img 
          src="https://simpleindianmeals.com/wp-content/uploads/2018/01/South-Indian-chicken-biryani.jpg"  
          className="w-full h-60 object-cover rounded-md" 
          alt="South Indian Chicken Biryani" 
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-md"></div>
        </div>

          <h3 className="text-2xl font-bold mt-4">Recipes</h3>
          <p className="text-gray-600 mt-2">Browse and cook amazing dishes.</p>
        </Link>
        
        {/* Favorites Box */}
        <Link to="/favorites" className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl ">
        <div className="relative w-full h-60">
        <img 
          src="https://www.southernliving.com/thmb/7oCQ4L6HaNIryOHL2Ttxvm8rFHw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Heaven-in-a-Bowl_3x2-066-6b099d564c274d04b2984f8c1d37ec8f.jpg" 
          className="w-full h-60 object-cover" 
          alt="Delicious dessert" 
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
          <h3 className="text-2xl font-bold mt-4">Favorites</h3>
          <p className="text-gray-600 mt-2">Save your favorite recipes.</p>
        </Link>
        
        {/* Calendar Box */}
        <Link to="/calender" className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl">
        <div className="relative w-full h-60">
        <img 
          src="https://media.istockphoto.com/id/980276548/photo/a-meal-plan-for-a-week-on-a-white-table-among-products-for-cooking-pastas-basil-vegetables.jpg?s=612x612&w=0&k=20&c=ykKkVcxwc_qgOg7lnN7tyi56uGT2iLsLi3LAJdoP4FU="  
          className="w-full h-60 object-cover rounded-md" 
          alt="South Indian Chicken Biryani" 
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-md"></div>
      </div>

          <h3 className="text-2xl font-bold mt-4">Meal Planner</h3>
          <p className="text-gray-600 mt-2">Plan your meals with ease.</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;