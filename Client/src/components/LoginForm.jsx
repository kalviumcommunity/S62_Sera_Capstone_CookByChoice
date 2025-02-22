import { useState } from "react";
import axios from "axios";
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post("http://localhost:5000/api/users/login", formData);
      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
    navigate('/recipes');
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="flex w-3/4 h-3/4 shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Welcome Section */}
        <div 
          className="w-1/2 flex flex-col justify-center items-center bg-cover bg-center p-10 text-brown-800 text-center"
          style={{ backgroundImage: "url('https://marketplace.canva.com/EAFyb0D3Y-A/1/0/900w/canva-brown-abstract-leaf-phone-wallpaper-Jh3lAgFhON0.jpg')" }}
        >
          <h1 className="text-4xl font-bold text-brown-900">Welcome Back!</h1>
          <p className="mt-4 text-lg text-brown-700">We are glad to see you again. Please login to continue.</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 flex justify-center items-center bg-white p-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
          >
            <div className="flex justify-center mb-4">
              <img src={Logo} alt="Logo" className="w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Login</h2>
            <p className="text-center text-gray-500 mb-6">Welcome back! Please login to your account.</p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500"
            />

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <a href="#" className="text-brown-500 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#734128] text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-brown-500 shadow-md"
            >
              Login
            </button>

            <p className="text-center mt-4 text-gray-600">
              New User? <Link to={'/signup'} className="text-brown-500 hover:underline">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
