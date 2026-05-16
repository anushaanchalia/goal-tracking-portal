import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loadingGoalId, setLoadingGoalId] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/logs`);
      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const unlockGoal = async (goalId) => {
    try {
      setLoadingGoalId(goalId);
      await axios.put(`${API_URL}/api/admin/unlock/${goalId}`);
      toast.success("Goal Unlocked");
      setLoadingGoalId(null);
      fetchLogs();
    } catch (error) {
      console.log(error);
      toast.error("Unlock Failed");
      setLoadingGoalId(null);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-600">System audit logs and administrative overrides.</p>
          </div>

          {logs.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-600 text-sm">No audit logs available at this time.</p>
            </div>
          )}

          {logs.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8">
              {logs.map((log) => (
                <div key={log.id} className="bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 rounded-xl p-5 relative flex flex-col">
                  
                  {/* Action Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Audit Log</h2>
                    <span className="bg-[#eef2ff] text-[#4f46e5] px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                      {log.action}
                    </span>
                  </div>

                  {/* Goal Info */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Target Goal</p>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{log.goal.title}</p>
                  </div>

                  {/* Change Delta */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 grid grid-cols-1 gap-2 border border-gray-100">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Change Record</p>
                    <div className="flex items-center gap-2 text-sm font-mono bg-white p-2 rounded border border-gray-200">
                      <span className="text-red-500 line-through decoration-red-300">{log.oldValue}</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-green-600 font-bold">{log.newValue}</span>
                    </div>
                  </div>

                  {/* Timestamp & Action */}
                  <div className="mt-auto flex items-end justify-between pt-2">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Timestamp</p>
                      <p className="text-xs text-gray-800 font-medium">
                        {new Date(log.changedAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => unlockGoal(log.goal.id)}
                      disabled={loadingGoalId === log.goal.id}
                      className={`text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-colors shadow-sm ${
                        loadingGoalId === log.goal.id
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-white border border-[#f43f5e] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-white"
                      }`}
                    >
                      {loadingGoalId === log.goal.id ? "Unlocking..." : "Unlock Goal"}
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

export default AdminDashboard;