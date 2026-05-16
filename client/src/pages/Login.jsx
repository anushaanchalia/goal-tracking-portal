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

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Goal Portal Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>

        <p className="text-center mt-5 text-gray-600">

          Don’t have an account?

          {" "}

          <a
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </a>

        </p>

      </form>

    </div>

  );

};

export default Login;