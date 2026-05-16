import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login Successful");

      setLoading(false);

      window.location.href = "/dashboard";

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 px-4">

      <div className="w-full max-w-md">

        {/* Card */}

        <form
          onSubmit={handleLogin}
          className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8"
        >

          {/* Heading */}

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white mb-3">
              Goal Portal
            </h1>

            <p className="text-gray-200">
              Login to continue your performance journey
            </p>

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="block text-white mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

          </div>

          {/* Password */}

          <div className="mb-6">

            <label className="block text-white mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-blue-700 hover:bg-blue-100 hover:scale-[1.02]"
            }`}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

          {/* Register */}

          <p className="text-center text-gray-200 mt-6">

            Don’t have an account?

            {" "}

            <a
              href="/register"
              className="text-white font-bold hover:underline"
            >
              Register
            </a>

          </p>

        </form>

      </div>

    </div>

  );

};

export default Login;