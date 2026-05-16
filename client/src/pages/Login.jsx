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

    <div className="min-h-screen bg-[#eef2ff] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-7xl bg-[#f7f8ff] rounded-[30px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white px-12 py-10 overflow-hidden">

          {/* BACKGROUND SHAPES */}

          <div className="absolute top-[-120px] right-[-80px] w-[350px] h-[350px] bg-white/10 rounded-full"></div>

          <div className="absolute bottom-[-150px] left-[-100px] w-[420px] h-[420px] bg-white/10 rounded-full"></div>

          {/* LOGO */}

          <div className="flex items-center gap-4 relative z-10 mb-16">

            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
              🎯
            </div>

            <h1 className="text-3xl font-bold text-white">
              Goal Portal
            </h1>

          </div>

          {/* WELCOME */}

          <div className="relative z-10 max-w-md">

            <h2 className="text-5xl font-bold leading-tight text-white mb-6">
              Welcome Back!
            </h2>

            <p className="text-xl text-blue-100 leading-relaxed mb-12">
              Log in to your account to continue tracking
              your goals and achieving greatness.
            </p>

            {/* FEATURES */}

            <div className="space-y-8">

              {/* FEATURE */}

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                  🎯
                </div>

                <div>

                  <h3 className="text-2xl font-semibold mb-1">
                    Set & Track Goals
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Define, track and achieve your goals
                  </p>

                </div>

              </div>

              {/* FEATURE */}

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                  📊
                </div>

                <div>

                  <h3 className="text-2xl font-semibold mb-1">
                    Analytics Dashboard
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Monitor your progress with insights
                  </p>

                </div>

              </div>

              {/* FEATURE */}

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                  👥
                </div>

                <div>

                  <h3 className="text-2xl font-semibold mb-1">
                    Team Collaboration
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Work together and achieve more
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="flex items-center justify-center px-8 py-10 bg-[#f7f8ff]">

          <form
            onSubmit={handleLogin}
            className="w-full max-w-xl bg-white rounded-[30px] shadow-xl px-10 py-10"
          >

            {/* LOCK ICON */}

            <div className="flex justify-center mb-8">

              <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">

                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl">
                  🔒
                </div>

              </div>

            </div>

            {/* HEADING */}

            <div className="text-center mb-8">

              <h2 className="text-4xl font-bold text-gray-800 mb-3">
                Goal Portal Login
              </h2>

              <p className="text-gray-500 text-lg">
                Enter your credentials to access your account
              </p>

            </div>

            {/* EMAIL */}

            <div className="mb-6">

              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* PASSWORD */}

            <div className="mb-8">

              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100"
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-xl font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
              }`}
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

            {/* REGISTER */}

            <p className="text-center text-gray-600 mt-6 text-lg">

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