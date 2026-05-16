import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {

  /* =========================
     STATES
  ========================== */

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE INPUT CHANGE
  ========================== */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  /* =========================
     HANDLE LOGIN
  ========================== */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        formData
      );

      /* =========================
         STORE TOKEN
      ========================== */

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      /* =========================
         SUCCESS TOAST
      ========================== */

      toast.success(
        "Login Successful"
      );

      setLoading(false);

      /* =========================
         REDIRECT
      ========================== */

      window.location.href = "/dashboard";

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

      setLoading(false);

    }

  };

  /* =========================
     UI
  ========================== */

  return (

    <div className="min-h-screen bg-[#eef2ff] flex items-center justify-center px-6 py-10">

      {/* =========================
          MAIN CONTAINER
      ========================== */}

      <div className="w-full max-w-7xl bg-[#f8f9ff] rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        {/* =========================================================
            LEFT SIDE
        ========================================================== */}

        <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 overflow-hidden p-16 text-white">

          {/* =========================
              BACKGROUND CIRCLES
          ========================== */}

          <div className="absolute top-[-120px] right-[-80px] w-[450px] h-[450px] bg-white/10 rounded-full"></div>

          <div className="absolute bottom-[-200px] left-[-120px] w-[520px] h-[520px] bg-white/10 rounded-full"></div>

          <div className="absolute top-[100px] left-[280px] w-3 h-3 bg-white/40 rounded-full"></div>
          <div className="absolute top-[140px] left-[320px] w-3 h-3 bg-white/40 rounded-full"></div>
          <div className="absolute top-[180px] left-[360px] w-3 h-3 bg-white/40 rounded-full"></div>
          <div className="absolute top-[220px] left-[300px] w-3 h-3 bg-white/40 rounded-full"></div>

          {/* =========================
              LOGO
          ========================== */}

          <div className="flex items-center gap-4 relative z-10 mb-28">

            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg">
              🎯
            </div>

            <h1 className="text-3xl font-bold tracking-wide">
              Goal Portal
            </h1>

          </div>

          {/* =========================
              WELCOME TEXT
          ========================== */}

          <div className="relative z-10 max-w-lg">

            <h2 className="text-6xl font-bold leading-tight mb-10">
              Welcome Back!
            </h2>

            <p className="text-2xl text-blue-100 leading-relaxed mb-16">

              Log in to your account to continue tracking
              your goals and achieving greatness.

            </p>

            {/* =========================
                FEATURES
            ========================== */}

            <div className="space-y-10">

              {/* FEATURE 1 */}

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-md">
                  🎯
                </div>

                <div>

                  <h3 className="text-2xl font-bold mb-2">
                    Set & Track Goals
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Define, track and achieve your goals
                  </p>

                </div>

              </div>

              {/* FEATURE 2 */}

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-md">
                  📊
                </div>

                <div>

                  <h3 className="text-2xl font-bold mb-2">
                    Analytics Dashboard
                  </h3>

                  <p className="text-blue-100 text-lg">
                    Monitor your progress with insights
                  </p>

                </div>

              </div>

              {/* FEATURE 3 */}

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-md">
                  👥
                </div>

                <div>

                  <h3 className="text-2xl font-bold mb-2">
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

        {/* =========================================================
            RIGHT SIDE
        ========================================================== */}

        <div className="flex items-center justify-center p-10 lg:p-16 bg-[#f8f9ff]">

          {/* =========================
              FORM CARD
          ========================== */}

          <form
            onSubmit={handleLogin}
            className="w-full max-w-xl bg-white rounded-[35px] shadow-xl p-12"
          >

            {/* =========================
                LOCK ICON
            ========================== */}

            <div className="flex justify-center mb-10">

              <div className="w-28 h-28 rounded-full bg-indigo-100 flex items-center justify-center shadow-inner">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl shadow-lg">
                  🔒
                </div>

              </div>

            </div>

            {/* =========================
                HEADING
            ========================== */}

            <div className="text-center mb-12">

              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Goal Portal Login
              </h2>

              <p className="text-gray-500 text-xl">
                Enter your credentials to access your account
              </p>

            </div>

            {/* =========================
                EMAIL INPUT
            ========================== */}

            <div className="mb-8">

              <label className="block text-xl font-semibold text-gray-800 mb-3">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* =========================
                PASSWORD INPUT
            ========================== */}

            <div className="mb-10">

              <label className="block text-xl font-semibold text-gray-800 mb-3">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
              />

            </div>

            {/* =========================
                LOGIN BUTTON
            ========================== */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl text-2xl font-bold transition-all duration-300 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-[1.01] hover:shadow-xl"
              }`}
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

            {/* =========================
                REGISTER LINK
            ========================== */}

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