import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const MyGoals = () => {

  const [goals, setGoals] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/goals/${user.id}`);
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">My Goals</h1>
            <p className="text-sm text-gray-500">Track and review your quarterly objectives.</p>
          </div>

          {goals.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500 text-sm">No goals available yet. Go create some!</p>
            </div>
          )}

          {goals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
              {goals.map((goal) => {
                const progress = goal.targetValue > 0
                  ? Math.min((goal.achievementValue / goal.targetValue) * 100, 100)
                  : 0;

                return (
                  <div key={goal.id} className="bg-white shadow-sm hover:shadow-md border border-gray-100 transition-all rounded-xl p-5 relative">
                    
                    {/* Title & Status */}
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-lg font-bold text-gray-900 pr-2 leading-tight line-clamp-2">
                        {goal.title}
                      </h2>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 ${
                          goal.approvalStatus === "APPROVED" ? "bg-green-100 text-green-700" : 
                          goal.approvalStatus === "REJECTED" ? "bg-red-100 text-red-700" : 
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                        {goal.approvalStatus}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-xs text-gray-500 line-clamp-2">
                      {goal.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-y-2 text-[11px] bg-gray-50 rounded-lg p-3 mb-4">
                      <p><span className="font-semibold text-gray-700">Area:</span> {goal.thrustArea}</p>
                      <p><span className="font-semibold text-gray-700">UOM:</span> {goal.uomType}</p>
                      <p><span className="font-semibold text-gray-700">Target:</span> {goal.targetValue}</p>
                      <p><span className="font-semibold text-gray-700">Done:</span> {goal.achievementValue}</p>
                      <p><span className="font-semibold text-gray-700">Weight:</span> {goal.weightage}%</p>
                      <p>
                        <span className="font-semibold text-gray-700">Status:</span>{" "}
                        <span className={`font-bold ${goal.status === "Completed" ? "text-green-600" : "text-blue-600"}`}>
                          {goal.status}
                        </span>
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-auto">
                      <div className="flex justify-between mb-1.5 items-end">
                        <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wide">Progress</span>
                        <span className="text-xs font-bold text-gray-900">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#5263f9] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyGoals;