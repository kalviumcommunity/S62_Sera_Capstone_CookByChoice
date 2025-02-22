import { useState } from "react";
import axios from "axios";
import Logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", formData);
      console.log("Signup successful:", response.data);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
    navigate('/login');
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex w-3/4 h-3/4 shadow-lg rounded-lg overflow-hidden">
       
        

        <div className="w-1/2 flex justify-center items-center bg-white p-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
          >
            <div className="flex justify-center mb-4">
              <img src={Logo} alt="Logo" className="w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Sign Up</h2>
            <p className="text-center text-gray-500 mb-6">Create a new account.</p>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500"
            />

            <input
              type="email"
              name="email"
              value=""
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500"
            />

            <input
              type="password"
              name="password"
              value=""
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500"
            />

            <button
              type="submit"
              className="w-full bg-[#734128] text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-[#5E3023] shadow-md"
            >
              Sign Up
            </button>

            <p className="text-center mt-4 text-gray-600">
              Already have an account? <Link to={'/login'} className="text-brown-500 hover:underline">Login</Link>
            </p>
          </form>
        </div>
        <div 
          className="w-1/2 flex flex-col justify-center items-center bg-cover bg-center p-10 text-brown-800 text-center"
          style={{ backgroundImage: "url('https://marketplace.canva.com/EAFyb0D3Y-A/1/0/900w/canva-brown-abstract-leaf-phone-wallpaper-Jh3lAgFhON0.jpg')" }}
        >
          <h1 className="text-4xl font-bold text-brown-900">Join Us!</h1>
          <p className="mt-4 text-lg text-brown-700">Create an account to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
