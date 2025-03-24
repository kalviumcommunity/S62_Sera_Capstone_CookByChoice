import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#5E3023]  p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
       

       
        <div className="hidden md:flex flex-1 justify-center space-x-10 text-lg font-medium text-white">
          <Link to="/" className="hover:text-amber-300 transition duration-300">Home</Link>
          <Link to="/recipes" className="hover:text-amber-300 transition duration-300">Recipes</Link>
          <Link to="/add-recipe" className="hover:text-amber-300 transition duration-300">Add Recipe</Link>
          <Link to="/favorites" className="hover:text-amber-300 transition duration-300">Favourites</Link>
          <Link to="/login" className="hover:text-amber-300 transition duration-300">Login</Link>
          <Link to="/calender" className="hover:text-amber-300 transition duration-300">Calendar</Link>
        </div>
       


        
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-3 space-y-3 bg-blue p-4 rounded-md shadow-md">
          <Link to="/" className="text-white hover:text-amber-300 transition duration-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/recipes" className="text-white hover:text-amber-300 transition duration-300" onClick={() => setIsOpen(false)}>Recipes</Link>
          <Link to="/add-recipe" className="text-white hover:text-amber-300 transition duration-300" onClick={() => setIsOpen(false)}>Add Recipe</Link>
          <Link to="/favorites" className="text-white hover:text-amber-300 transition duration-300" onClick={() => setIsOpen(false)}>Favourites</Link>
          <Link to="/login" className="text-white hover:text-amber-300 transition duration-300" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/calender" className="text-white hover:text-amber-300 transition duration-300" onClick={() => setIsOpen(false)}>Calendar</Link>

         
        </div>
      )}
    </nav>
  );
};

export default Navbar;
