import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
};
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [animate, setAnimate] = useState(false); // For transition effect
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      localStorage.clear("setIng");
      localStorage.setItem("token", response.data.token);
      setMessage("Login succesful");
      console.log("Login successful:", response.data);
      navigate("/recipes");
    } catch (err) {
      setMessage("Incorrect password");
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div
        className={`flex w-3/4 h-3/4 shadow-lg rounded-lg overflow-hidden transform transition-all duration-700 ease-out ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Left Side - Welcome Section */}
        <div
          className={`w-1/2 flex flex-col justify-center items-center bg-cover bg-center p-10 text-brown-800 text-center transform transition-all duration-1000 ease-out ${
            animate
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
          style={{
            backgroundImage:
              "url('https://marketplace.canva.com/EAFyb0D3Y-A/1/0/900w/canva-brown-abstract-leaf-phone-wallpaper-Jh3lAgFhON0.jpg')",
          }}
        >
          <h1 className="text-4xl font-bold text-brown-900">Welcome Back!</h1>
          <p className="mt-4 text-lg text-brown-700">
            We are glad to see you again. Please login to continue.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div
          className={`w-1/2 flex justify-center items-center bg-white p-10 transform transition-all duration-1000 ease-out ${
            animate ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200"
          >
            <div className="flex justify-center mb-4">
              <img src={Logo} alt="Logo" className="w-12 h-12" />
            </div>

            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
              Login
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Welcome back! Please login to your account.
            </p>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500 transition-all duration-300"
            />
            <p className="text-red-500">{message}</p>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 bg-white text-gray-800 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-brown-500 transition-all duration-300"
            />

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <a href="#" className="text-brown-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#734128] text-white px-4 py-2 rounded-lg font-semibold transition hover:bg-brown-500 shadow-md"
            >
              Login
            </button>
            <br/>
            <br/>
            <button
            onClick={handleGoogleLogin}
          
      className="flex items-center w-80 bg-white text-gray-600 border border-gray-300 rounded-md px-4 py-2 shadow-md hover:bg-gray-100 transition duration-300"
    ><hr/>
      <img
        src="data:image/png;base64,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"
        alt="Google Logo"
        className="w-5 h-5 mr-2"
      />
      Sign in with Google
    </button>

            <p className="text-center mt-4 text-gray-600">
              New User?{" "}
              <Link to={"/signup"} className="text-brown-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
