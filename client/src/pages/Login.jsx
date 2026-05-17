import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiTarget, FiLock, FiMail, FiEyeOff, FiEye, FiLogIn, FiTrendingUp, FiUsers } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useMsal } from "@azure/msal-react";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { instance: msalInstance } = useMsal();

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

  const executeSocialLogin = async (email, provider) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/auth/social-login`, { email });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success(`${provider} Login Successful`);
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        `${provider} Login Failed. Are you registered?`
      );
      setLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google using the access token
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        executeSocialLogin(userInfo.data.email, "Google");
      } catch (error) {
        toast.error("Failed to fetch Google profile");
      }
    },
    onError: () => {
      toast.error("Google Login Failed");
    }
  });

  const loginMicrosoft = async () => {
    try {
      const response = await msalInstance.loginPopup({
        scopes: ["user.read"]
      });
      // The response account contains the username (email)
      const email = response.account.username;
      executeSocialLogin(email, "Microsoft");
    } catch (error) {
      console.log(error);
      toast.error("Microsoft Login Failed");
    }
  };

  return (
    <div className="fixed inset-0 w-full overflow-hidden flex flex-col md:flex-row font-sans bg-white">
      
      {/* LEFT PANEL */}
      <div className="relative w-full md:w-[40%] lg:w-[45%] bg-gradient-to-br from-[#4d74f2] to-[#8b5cf6] px-8 py-6 lg:px-16 lg:py-10 flex flex-col justify-center overflow-hidden text-white h-full">
        {/* Background Decorative Waves */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           <div className="absolute -top-[10%] -left-[20%] w-[140%] h-[120%] bg-white/5 rounded-[100%] blur-[2px]"></div>
           <div className="absolute -bottom-[10%] -right-[10%] w-[120%] h-[80%] bg-white/10 rounded-[100%] blur-[2px]"></div>
           <div className="absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-white/30"></div>
           <div className="absolute top-[25%] left-[35%] w-2 h-2 rounded-full bg-white/40"></div>
           <div className="absolute top-[15%] left-[65%] w-4 h-4 rounded-full bg-white/20"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center gap-3 mb-8 lg:mb-10">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-sm">
            <FiTarget className="text-2xl text-white" />
          </div>
          <span className="text-xl font-bold tracking-wide">Goal Portal</span>
        </div>

        {/* Middle Content */}
        <div className="relative z-10">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 text-white leading-tight">Welcome Back!</h1>
          <p className="text-blue-100 text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed max-w-sm">
            Log in to your account to continue tracking your goals and achieving greatness.
          </p>

          <div className="space-y-4 lg:space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <FiTarget className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-0.5 text-white">Set & Track Goals</h3>
                <p className="text-blue-100 text-xs">Define, track and achieve your goals</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <FiTrendingUp className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-0.5 text-white">Analytics Dashboard</h3>
                <p className="text-blue-100 text-xs">Monitor your progress with insights</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <FiUsers className="text-xl text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-0.5 text-white">Team Collaboration</h3>
                <p className="text-blue-100 text-xs">Work together and achieve more</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-[60%] lg:w-[55%] bg-[#fafbfc] px-6 py-4 sm:px-12 lg:px-20 flex flex-col justify-center h-full">
        <div className="max-w-[420px] w-full mx-auto">
          {/* Lock Icon */}
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="w-16 h-16 rounded-full bg-[#eef2ff] flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#5263f9] flex items-center justify-center text-white shadow-md">
                <FiLock className="text-xl" />
              </div>
            </div>
          </div>

          <div className="text-center mb-5 lg:mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 lg:mb-2">Goal Portal Login</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#5263f9] focus:ring-2 focus:ring-[#eef2ff] shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#5263f9] focus:ring-2 focus:ring-[#eef2ff] shadow-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#5263f9] focus:ring-[#5263f9] mr-2 cursor-pointer"
                />
                <span className="text-xs font-medium">Remember me</span>
              </label>
              <a href="#" className="text-xs font-medium text-[#5263f9] hover:text-[#4352d8] hover:underline transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                loading
                  ? "bg-[#8a96fc] text-white cursor-not-allowed"
                  : "bg-[#5263f9] hover:bg-[#4352d8] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Logging in..." : (
                <>
                  <FiLogIn className="text-lg" /> Login
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4 lg:my-5">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <button
                type="button"
                onClick={() => loginGoogle()}
                className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all text-sm font-bold text-gray-700"
              >
                <FcGoogle className="text-lg" /> Google
              </button>
              <button
                type="button"
                onClick={() => loginMicrosoft()}
                className="flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-all text-sm font-bold text-gray-700"
              >
                <div className="w-[14px] h-[14px] grid grid-cols-2 gap-[1px]">
                  <div className="bg-[#f25022]"></div>
                  <div className="bg-[#7fba00]"></div>
                  <div className="bg-[#00a4ef]"></div>
                  <div className="bg-[#ffb900]"></div>
                </div>
                Microsoft
              </button>
            </div>

            {/* Register */}
            <p className="text-center text-xs text-gray-600 mt-4 lg:mt-5 font-medium">
              Don't have an account?{" "}
              <a href="/register" className="text-[#5263f9] font-bold hover:text-[#4352d8] hover:underline transition-colors">
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