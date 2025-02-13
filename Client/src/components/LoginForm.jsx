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
  const navigate=useNavigate()

  
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
    navigate('/recipes')
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FAE1C3] p-8 rounded-xl shadow-lg w-80 text-[#5E3023] border-2 border-[#D9A86C]"
      >
        {/* Centered Logo */}
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </div>

        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

    

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 border-2 border-[#D9A86C] bg-white text-[#5E3023] rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full p-3 border-2 border-[#D9A86C] bg-white text-[#5E3023] rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          type="submit"
          className="w-full bg-amber-400 text-[#5E3023] px-4 py-2 rounded-lg font-semibold transition hover:bg-amber-500 shadow-md"
        >
          Login
        </button>
        <p className="text-center">
            Dont have an account ? <Link to={'/signup'}>Sign up</Link>
          </p>
      </form>
    </div>
  );
};

export default LoginForm;
