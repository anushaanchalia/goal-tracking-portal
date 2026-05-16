import Navbar from "../components/Navbar";
import { FiPlusCircle, FiList, FiCheckSquare, FiBarChart2, FiShield, FiBriefcase } from "react-icons/fi";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-8 mb-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Here's an overview of your goals and progress. Let's make today productive.
            </p>
          </div>
          <div className="mt-6 md:mt-0 relative z-10">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-[#eef2ff] text-[#5263f9]">
              Role: {user?.role}
            </span>
          </div>

          {/* Banner Decorative Elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-[#4d74f2]/10 to-[#8b5cf6]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-40 -bottom-20 w-40 h-40 bg-[#8b5cf6]/5 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        <div className="space-y-12">
          
          {/* Core Employee Features */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#5263f9] rounded-full inline-block"></span>
              Your Workspace
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <a href="/create-goals" className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#5263f9]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <FiPlusCircle className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Create Goals</h3>
                <p className="text-sm text-gray-600">Set new objectives and key results for the upcoming quarter.</p>
              </a>

              <a href="/my-goals" className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#10b981]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <FiList className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">View Goals</h3>
                <p className="text-sm text-gray-600">Track your progress and review your current active targets.</p>
              </a>

              <a href="/checkins" className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#f59e0b]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <FiCheckSquare className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quarterly Check-ins</h3>
                <p className="text-sm text-gray-600">Submit your quarterly reviews and get manager feedback.</p>
              </a>

              <a href="/analytics" className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#ec4899]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center mb-4 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                  <FiBarChart2 className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Analytics</h3>
                <p className="text-sm text-gray-600">View detailed metrics and visual insights on your performance.</p>
              </a>

            </div>
          </section>

          {/* Elevated Privileges */}
          {(user?.role === "MANAGER" || user?.role === "ADMIN") && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full inline-block"></span>
                Administration
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {user?.role === "MANAGER" && (
                  <a href="/manager" className="group bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 backdrop-blur-sm">
                        <FiBriefcase className="text-2xl" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Manager Panel</h3>
                      <p className="text-sm text-purple-100">Review team goals, approve check-ins, and track team analytics.</p>
                    </div>
                    {/* Decorative */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-tl-full pointer-events-none"></div>
                  </a>
                )}

                {user?.role === "ADMIN" && (
                  <a href="/admin" className="group bg-gradient-to-br from-red-600 to-rose-700 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-4 backdrop-blur-sm">
                        <FiShield className="text-2xl" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Admin Panel</h3>
                      <p className="text-sm text-red-100">Manage system users, global settings, and platform administration.</p>
                    </div>
                    {/* Decorative */}
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-tl-full pointer-events-none"></div>
                  </a>
                )}

              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;