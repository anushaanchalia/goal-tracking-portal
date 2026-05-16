import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const ManagerDashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/goals/manager/pending/all`);
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveGoal = async (id) => {
    try {
      setLoadingId(id);
      await axios.put(`${API_URL}/api/goals/approve/${id}`);
      toast.success("Goal Approved");
      setLoadingId(null);
      fetchGoals();
    } catch (error) {
      console.log(error);
      toast.error("Approval Failed");
      setLoadingId(null);
    }
  };

  const rejectGoal = async (id) => {
    try {
      setLoadingId(id);
      await axios.put(`${API_URL}/api/goals/reject/${id}`, {
        managerComment: comments[id] || ""
      });
      toast.error("Goal Rejected");
      setLoadingId(null);
      fetchGoals();
    } catch (error) {
      console.log(error);
      toast.error("Rejection Failed");
      setLoadingId(null);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Manager Panel</h1>
            <p className="text-sm text-gray-600">Review and moderate pending employee goals.</p>
          </div>

          {goals.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-600 text-sm">No pending goals available to review.</p>
            </div>
          )}

          {goals.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 rounded-xl p-5 relative flex flex-col">
                  
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-900 pr-2 leading-tight line-clamp-1">{goal.title}</h2>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide shrink-0">
                      {goal.approvalStatus}
                    </span>
                  </div>

                  <p className="mb-4 text-xs text-gray-600 line-clamp-2">
                    {goal.description}
                  </p>

                  <div className="grid grid-cols-2 gap-y-2 text-xs bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="col-span-2"><span className="font-semibold text-gray-800">Employee:</span> {goal.employee.name}</p>
                    <p><span className="font-semibold text-gray-800">Weightage:</span> {goal.weightage}%</p>
                    <p><span className="font-semibold text-gray-800">UOM:</span> {goal.uomType}</p>
                  </div>

                  <textarea
                    placeholder="Optional feedback for rejection..."
                    rows="2"
                    className="w-full border border-gray-200 text-xs p-2 rounded-lg mb-3 focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors resize-none text-gray-800 placeholder-gray-500"
                    onChange={(e) => setComments({ ...comments, [goal.id]: e.target.value })}
                  />

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <button
                      onClick={() => approveGoal(goal.id)}
                      disabled={loadingId === goal.id}
                      className={`text-xs font-bold uppercase tracking-wide py-2.5 rounded-lg transition-colors shadow-sm ${
                        loadingId === goal.id
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#10b981] hover:bg-[#059669] text-white"
                      }`}
                    >
                      {loadingId === goal.id ? "..." : "Approve"}
                    </button>

                    <button
                      onClick={() => rejectGoal(goal.id)}
                      disabled={loadingId === goal.id}
                      className={`text-xs font-bold uppercase tracking-wide py-2.5 rounded-lg transition-colors shadow-sm ${
                        loadingId === goal.id
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-white border border-[#f43f5e] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-white"
                      }`}
                    >
                      {loadingId === goal.id ? "..." : "Reject"}
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;