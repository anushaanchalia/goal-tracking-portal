import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  FiTarget, 
  FiLock, 
  FiMail, 
  FiEyeOff, 
  FiEye, 
  FiUserPlus, 
  FiTrendingUp, 
  FiUsers, 
  FiUser, 
  FiBriefcase 
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await axios.post(`${API_URL}/api/auth/register`, formData);
      toast.success("User Registered Successfully");
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE"
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
      setLoading(false);
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
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-3 text-white leading-tight">Join Us!</h1>
          <p className="text-blue-100 text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed max-w-sm">
            Create an account to start defining and tracking your professional goals.
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
          
          <div className="text-center mb-5 lg:mb-6">
            <div className="flex justify-center mb-3 lg:mb-4">
              <div className="w-14 h-14 rounded-full bg-[#eef2ff] flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#5263f9] flex items-center justify-center text-white shadow-md">
                  <FiUserPlus className="text-xl" />
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
            <p className="text-sm text-gray-500">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 text-lg" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#5263f9] focus:ring-2 focus:ring-[#eef2ff] shadow-sm transition-all"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Account Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiBriefcase className="text-gray-400 text-lg" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-[#5263f9] focus:ring-2 focus:ring-[#eef2ff] shadow-sm transition-all appearance-none cursor-pointer"
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
                {/* Custom select arrow */}
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 mt-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                loading
                  ? "bg-[#8a96fc] text-white cursor-not-allowed"
                  : "bg-[#5263f9] hover:bg-[#4352d8] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Creating Account..." : (
                <>
                  <FiUserPlus className="text-lg" /> Register
                </>
              )}
            </button>

            {/* Login */}
            <p className="text-center text-xs text-gray-600 mt-4 font-medium">
              Already have an account?{" "}
              <a href="/" className="text-[#5263f9] font-bold hover:text-[#4352d8] hover:underline transition-colors">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;