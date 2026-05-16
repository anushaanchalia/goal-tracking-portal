import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );

      toast.success(
        "User Registered Successfully"
      );

      console.log(response.data);

      setLoading(false);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
      });

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Registration Failed"
      );

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={formData.role}
          className="w-full border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        >

          <option value="EMPLOYEE">
            Employee
          </option>

          <option value="MANAGER">
            Manager
          </option>

          <option value="ADMIN">
            Admin
          </option>

        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-3 rounded-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>

        <p className="text-center mt-5 text-gray-600">

          Already have an account?

          {" "}

          <a
            href="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </a>

        </p>

      </form>

    </div>

  );

};

export default Register;