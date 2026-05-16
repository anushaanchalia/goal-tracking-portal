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

    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SECTION */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-500 to-purple-700 text-white p-16 relative overflow-hidden">

          <div className="relative z-10">

            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Welcome Back!
            </h1>

            <p className="text-2xl text-blue-100 leading-relaxed mb-12">
              Log in to your account to continue tracking
              your goals and performance journey.
            </p>

            <div className="space-y-8">

              <div className="flex items-start gap-5">

                <div className="bg-white/20 p-4 rounded-2xl text-3xl">
                  🎯
                </div>

                <div>

                  <h3 className="text-2xl font-semibold mb-2">
                    Set & Track Goals
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Define and monitor your organizational goals
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-5">

                <div className="bg-white/20 p-4 rounded-2xl text-3xl">
                  📊
                </div>

                <div>

                  <h3 className="text-2xl font-semibold mb-2">
                    Analytics Dashboard
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Visualize progress with smart insights
                  </p>

                </div>

              </div>

              <div className="flex items-start gap-5">

                <div className="bg-white/20 p-4 rounded-2xl text-3xl">
                  🤝
                </div>

                <div>

                  <h3 className="text-2xl font-semibold mb-2">
                    Team Collaboration
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Collaborate efficiently with managers
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="flex items-center justify-center p-8 md:p-16 bg-white">

          <form
            onSubmit={handleLogin}
            className="w-full max-w-lg"
          >

            <div className="text-center mb-12">

              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl mb-6 shadow-lg">
                🔒
              </div>

              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                Goal Portal
              </h2>

              <p className="text-gray-500 text-xl">
                Enter your credentials to continue
              </p>

            </div>

            {/* EMAIL */}

            <div className="mb-8">

              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-10">

              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.02] hover:shadow-xl"
              }`}
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

            {/* REGISTER */}

            <p className="text-center text-gray-600 mt-8 text-lg">

              Don’t have an account?

              {" "}

              <a
                href="/register"
                className="text-blue-600 font-bold hover:underline"
              >
                Register
              </a>

            </p>

          </form>

        </div>

      </div>

    </div>

  );

};

export default Login;