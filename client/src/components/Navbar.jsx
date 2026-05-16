import toast from "react-hot-toast";
import { FiLogOut, FiUser, FiTarget } from "react-icons/fi";

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/dashboard'}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4d74f2] to-[#8b5cf6] flex items-center justify-center shadow-sm">
              <FiTarget className="text-white text-lg" />
            </div>
            <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#4d74f2] to-[#8b5cf6]">
              Goal Portal
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-[#5263f9] transition-colors">
              Dashboard
            </a>
            <a href="/create-goals" className="text-sm font-medium text-gray-600 hover:text-[#5263f9] transition-colors">
              Create Goals
            </a>
            <a href="/my-goals" className="text-sm font-medium text-gray-600 hover:text-[#5263f9] transition-colors">
              My Goals
            </a>
            <a href="/checkins" className="text-sm font-medium text-gray-600 hover:text-[#5263f9] transition-colors">
              Check-ins
            </a>
            <a href="/analytics" className="text-sm font-medium text-gray-600 hover:text-[#5263f9] transition-colors">
              Analytics
            </a>

            {/* Role-Specific Links */}
            {user?.role === "MANAGER" && (
              <a href="/manager" className="text-sm font-bold text-[#8b5cf6] hover:text-[#7c3aed] transition-colors border-l pl-8 border-gray-200">
                Manager Panel
              </a>
            )}
            {user?.role === "ADMIN" && (
              <a href="/admin" className="text-sm font-bold text-[#ef4444] hover:text-[#dc2626] transition-colors border-l pl-8 border-gray-200">
                Admin Panel
              </a>
            )}
          </div>

          {/* User & Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              <div className="w-6 h-6 rounded-full bg-[#eef2ff] flex items-center justify-center text-[#5263f9]">
                <FiUser className="text-xs" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{user?.name || "User"}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <FiLogOut />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;