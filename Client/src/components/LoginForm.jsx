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
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAABXFBMVEX09PTjPis6fOwsokzxtQA2euz8+fRVjO309Pb09PNbi+4sokvz9fNllOzkPSvz9PbxsgD1+vsqdewRnT369voen0P0/P7iNB7z+vj09/zxuQDxsAA5fer4tQA7evL89/vw3tzjLRLvy8boiYHjNSHgJwBKrGNbtG/T5dWPxZrz7O7y5eTv1dPttrDplI3neHHmYlfkSzriU0Pka1/pgXrpnpfqvrrkUUTqp53jWEvrrqvlh3jlal7piIPqmJPw5uDwsjDkVx3z4bvpcRrgMy3wwkTrkQ706c3wpQbhTSPzymrmZR3y8eTqhBbz2aHxpgV3oOzZ4vbzyWO7zPGctfLz1Ivy3KnO2fLx15PV3vW/rRKYqyWs1LryvCllpjrVsQ2lve6srCFxu4SEqC5Poz7B38qGqe9ltnwegbeXy6QppDozj5otm2w2hco0jag9qFkyl4I4gdgxk41ssZxFFLiJAAALGklEQVR4nO2djVcaxxqHRxdwxh13WXYXWEVxEQUUv2JiNGnT29ykSXtpr2mSpmlIk9JLLd4Pb3v//3PuDKARYXYHFsTZnedEjRzOHvd33nferxkWAIlEIpFIJBKJRCKRSCQ3BCZf8OIXaFDIixBCgOgr+tT+MAHAAELyhbOGgcHm1mq1WigUqtXVrc2OkhAjoKNp/5W3FwyMdPaL6vbO7t5+0V13L5i5c3D33mEVpYmu0gAZED9d3V67U8y4maKmzbTR6H/ItyJ9VdvbOdyk3kwtEPpeLzJgqh0u7By7RKOucAPQqIYHR6tZJ9uRUNIGGrj6cIZIx1TuUsEZIuH9o1VDl2HkAmPz6NjN+ErXcWb6LZPZPTQMqR9AumGsrvHY3TU3dvcfbJL4jFGkRUTp1V23OJx2XQXd/SPdQJFOZIh460W6og2vnkZ8eGZbN6Z9C9MCAgPsZDIjiXchoXtcSE/7PqYCQrpzWHRHlq5Lcf3uVhQNEBpbB65HjsdtgZn9w6gZIClss9sZvlTFX8D1hygLEJ72Td0gGN51R1/zrpO5v5qlTZmokK3uj8n0ZtqRp5jZTiNr2nd1A5AsF+H0IU2Tx2R87cto7k4WRyADhBCj9L3AAbcfdxdHYvVzsmvu2MWjEXhvc9q3NnFIfMS7E7A9ckV3bdo3N2kg/XcwvqBxFXctHfa1D1sAfzYp9SJQe8CJeC5V7/PstO9t8sAsSZYnot5aBNQDxqNJqZeOQMlhbE9GvfXPs+FXDxpV3jK3PZwklVgm45KvT1PLQW+NiudmN/c1Lvk0OslwM/u7O/eOHjw4Onp092DfdQeL2FbPCL/tAeQcZDSe/h6dAu0+qIL2/hboZLP052bh3mczA2ciZN3Twy4fgsA44klZNM0trhU2s4YOrjagICYSbm0fuJnr9ktsL/ylro4AWfj8KWb2tnVDHzh7hFkj/cWjmasjTY3aXvjVo5um9oq+Cx8d/BhZ5u4VCLGe3bx3dSa8vuZEQD2gE9f1U09z7x+mSRRAEA0sXjHdCUO8ePOyYaNFw/bI2rflNwnXtPVHyOAp+lG6sN/ptroPI2F7JGHe9ZZPm8ncqRqQb8sAclC79iO2N/E//BaAgFHwGUlq7l1gkDdytpyg8WBdozE37C0qClmv9nyMzz0aslmXPXSjETWosx263uqtHw6ZvGHgrMJoqEdM5S9fPvFSr1gwhhzSkrfrUdlbpT9OLv71CTtvcQsRaBSPjv40Flv8ihU7NPcwCs26kdGfJWPJ2OLzrwc6MIka2cFpsoSCnW+SMcJi7G99Dkx+zTyMQMk/OhjWYl0Wv+3r92nFY3k+wxPnu2RXvuTi87744a6SWmPaf+JthgaOS/tb+rLHgcnCJ4OuJ3otGbsCzWA+UTyW6543+o9LV+VLkgxGZnz8OE+TyV79/v71E60zSyvucnWoIoxei12HZjCdzZGZagTms4HQfyAG1yfgt5057q6Mup5g0M2Zr+v3vB12q3Ll8wQi/f0g+WIxksFox5E+zMcB1GtLA9WjGUxmWy583mDrMUu+2OJXWxxXQIlgTPwWJwl0fhzsu5SnDof1JU7m50Zn/oXYocn5nilf8jud4xxLYiEegNRLoeVDznum8SWfWRwVG5VvdmTir4T2XphgyxfDPPMNIt/o6uXiJ2LL119zdE0vFvvewXzOO7p8s7NzQsvnPGMvfa8dnqF4QPnmhZ7G6ey8JfmYK2kOJF98Nie2fD+w5Xs2efmIgEJnLh5pX7J2E9aXeoEEHuPpr1nqkcDLdYWA1pd6g6G4lbXzml108N1VYPlQSOVzuK4QVD6hyw4P+d7flHwC6zdl68sR+UTOm6e89nXkE7er6CXfzUTelwmBJ8lTzvtmc2LLB6dddaReYnF9l+4rZcm39JirHA1qfW+Elo/dcVl6rfPkFEFDx1uR5QOsfl8sGfuG6xhpUOcVumUAa4xuMzHK95hni0FA+XK60PsYPGYdSzWegxnBOi5xsft9yHPSxnOGPmDDak7oY1s+c16OKyQWUv7zSJZ8uRWxR0UAsrr1ydjyTzWeUdHJ3LwfcyTEMsxP8EElrrGsb/mdWeeQD2ESYXzQcyz7iwvdr6LHv1mx42dFKfFcgogHvUFvUyzrS70RWj4weH9fMvbBVhTVLI/l0S+Jj2z5hA68oLO7tE+95V8Uit3Ij+NQaWKOHTuEXvrAwL3NydiviqoS+VS7PIYPC0YOM/TGfxNdPuA8vabe8od/KG3xiHwNK7h8xHdZ8qU+Cv9IGafnXAfNV2zlErMcWD6E2b4rdsXbBl5LXd4pV+EKvl7o+E2Kpd7svMCN+i5If5r8ZHskX1GvqKeS3C9Y8IDsqk707Wlt0OWJSuK4H1SlFxI9rECff5ZgGl9O8CnlBZexd/kXW+0xPho+SjhI8kJXPlbSR7I+rp7YrebyZMxy8ldF6bM+1azkAyTPJOyyxMutLCSEX/rAxWcZ0HxlIGY9j0fVD79gt7PicaFH5J+gwWP5J1Xts72O/5rN/IgDCQTYSQtB9IqtC3y8tPxuoHZd/21aI90oQifspCUMJUcHDD78zNCuja2WR1j/IE78xuwVzIYiZ+5iNU0v+Uj6R/x32G14GL9KeZz5iM+JvL+gBww3bKbztvWz6/khr4mI7Xmse3R/gbj7InvBfuZH4m8DDJGjIZhwFrw8lxZswrcLLsAwf2p7WR+NHxtlzkc16aQQzL+dT80ye/R0d8bHUcP5LQSDmrd8tP4wW5zdP2Thyu8rRD22+cVzGIehYusCrZbpp59ibjTz9MOFva5DFgKYb26YZ/9ciXtYX+pjIjzOS90XbngGj46EZqnsvQRiYOFmybQV5exfuRW28c2F66m9EFtl01c/VbHNUhNabCfOgzoVjxYw9vm/mfoJP2G7BiYLVssv+rYVVE2lUsYW7eIjusMC0WdP0g/ChlYeNxt2dw2gJeDZf1biswMcOEcKjoBtxFuIVbJ9tOsqaJvnjXoZWgTQ/k6AuNk6VcyeK6jmfwflzeS1kFS7PWDsv/p1LYsoaNobjUqrTmlVGiWFvEDHc71XsM//WOkXUOzTCExgmcd9r2hIMAnkh6p2fbb3PeRdv/ctgKmT0JRrPUCrPoR+nJz9GZ/t2SIUz4X0A50htCrj18+8lsGkXiDhW/SDoE9YzDd8qo9hodm28imDidOTHCBUOd9VMPApfkeSsJ3BdG3vVSgGHIPBUIec6csQ6tEMpp3/Eds7CfMjyi2SCMPTcetHU8WNP6gDpxYACmng6EJu79SnezCSfmckg0kthFs7QOVDsDHu+EtrYPPP1EKYmlSDQbSLWRm3/dF65Ox/DgpXo4UBTNQv64ix6Wc2QtTg80a3yuf2WPVTzVY+vBlLD+3nJ+LGOB3YVpv50D+psgdSANv9e4ZGwyzVRtuoIDBWrTSmCGy2xN9GOixIR7BuBy/h6IDEguGtc1kgWoVU7EAhRFXt87rFdS49hNAJ0qkZwAJNs8LzGZQhhaTQKD+6gLZdwfnIZHv9tJ8mC61yozPI4J2FtA8l2aZKLS+MU6EhQfla67w7vuXSTyWGV6rjqCTKPpAsms5wVdN7G9uleqZ5Xilbkcv0WOiYPvudKFghNkirYbVjYr0eq3RHmHapVQZW2Bt7wwOhBcv1xrltXkwmVVW9bC2oNnldKVWaGEm7G4wOkWUBXG41TjfU9oy3i61slBqtZhnn8yRFlkseA0yP3iNg5SHCuFwuNynlcg1jDOmWDahDuvVF6ucHCSdXPq8AjOHctEQikUgkEolEIpFIJBJe/g8h8UrsydYNtAAAAABJRU5ErkJggg=="
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
