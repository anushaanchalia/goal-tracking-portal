import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/api/auth/login`, formData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Login Successful");

      setLoading(false);

      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[1450px] bg-[#f7f8ff] rounded-[36px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT PANEL */}

        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white px-14 py-12 overflow-hidden flex flex-col justify-between">
          {/* Decorative Shapes */}

          <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] bg-white/10 rounded-full blur-sm"></div>

          <div className="absolute bottom-[-180px] left-[-150px] w-[520px] h-[520px] bg-white/10 rounded-full blur-sm"></div>

          {/* Dots */}

          <div className="absolute top-16 left-1/2 grid grid-cols-4 gap-4 opacity-30">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>
            ))}
          </div>

          {/* Logo */}

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg">
              🎯
            </div>

            <h1 className="text-[38px] font-bold tracking-tight">
              Goal Portal
            </h1>
          </div>

          {/* Content */}

          <div className="relative z-10 max-w-lg">
            <h2 className="text-[72px] leading-[78px] font-extrabold mb-8">
              Welcome Back!
            </h2>

            <p className="text-[26px] text-blue-100 leading-relaxed mb-16">
              Log in to your account to continue tracking your goals and
              achieving greatness.
            </p>

            {/* Features */}

            <div className="space-y-10">
              {/* Feature */}

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
                  🎯
                </div>

                <div>
                  <h3 className="text-[28px] font-bold mb-1">
                    Set & Track Goals
                  </h3>

                  <p className="text-blue-100 text-[20px]">
                    Define, track and achieve your goals
                  </p>
                </div>
              </div>

              {/* Feature */}

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
                  📊
                </div>

                <div>
                  <h3 className="text-[28px] font-bold mb-1">
                    Analytics Dashboard
                  </h3>

                  <p className="text-blue-100 text-[20px]">
                    Monitor your progress with insights
                  </p>
                </div>
              </div>

              {/* Feature */}

              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
                  👥
                </div>

                <div>
                  <h3 className="text-[28px] font-bold mb-1">
                    Team Collaboration
                  </h3>

                  <p className="text-blue-100 text-[20px]">
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
            className="w-full max-w-[760px] bg-white rounded-[34px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-12 py-12"
          >
            {/* Lock Icon */}

            <div className="flex justify-center mb-8">
              <div className="w-28 h-28 rounded-full bg-indigo-100/70 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl shadow-lg">
                  🔒
                </div>
              </div>
            </div>

            {/* Heading */}

            <div className="text-center mb-10">
              <h2 className="text-[48px] font-bold text-gray-800 mb-4">
                Goal Portal Login
              </h2>

              <p className="text-gray-500 text-[22px]">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Email */}

            <div className="mb-7">
              <label className="block text-[20px] font-semibold text-gray-700 mb-3">
                Email
              </label>

              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  ✉️
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-2xl pl-14 pr-5 py-5 text-[19px] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}

            <div className="mb-5">
              <label className="block text-[20px] font-semibold text-gray-700 mb-3">
                Password
              </label>

              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                  🔒
                </span>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-2xl pl-14 pr-14 py-5 text-[19px] focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                />

                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            {/* Remember / Forgot */}

            <div className="flex items-center justify-between mb-8">
              <label className="flex items-center gap-3 text-gray-600 text-lg">
                <input type="checkbox" className="w-5 h-5 rounded" />
                Remember me
              </label>

              <a
                href="#"
                className="text-blue-600 font-medium hover:underline text-lg"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl text-[22px] font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-[1.01]"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-4 my-10">
              <div className="flex-1 h-[1px] bg-gray-200"></div>

              <span className="text-gray-400 text-lg">or continue with</span>

              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* Social Buttons */}

            <div className="grid grid-cols-2 gap-5">
              <button
                type="button"
                className="border border-gray-300 rounded-2xl py-4 text-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Google
              </button>

              <button
                type="button"
                className="border border-gray-300 rounded-2xl py-4 text-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Microsoft
              </button>
            </div>

            {/* Register */}

            <p className="text-center text-gray-600 mt-10 text-[19px]">
              Don’t have an account?{" "}
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
