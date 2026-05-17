import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("audit");
  const [logs, setLogs] = useState([]);
  const [escalations, setEscalations] = useState([]);
  const [loadingGoalId, setLoadingGoalId] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);

  const [sharedGoal, setSharedGoal] = useState({
    employeeIds: "",
    thrustArea: "",
    title: "",
    description: "",
    uomType: "Numeric",
    targetValue: "",
    weightage: ""
  });

  useEffect(() => {
    if (activeTab === "audit") fetchLogs();
    if (activeTab === "escalations") fetchEscalations();
    if (activeTab === "user_approvals") fetchPendingUsers();
  }, [activeTab]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/logs`);
      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEscalations = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/escalations`);
      setEscalations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users/pending`);
      setPendingUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveUser = async (id) => {
    try {
      await axios.put(`${API_URL}/api/admin/users/approve/${id}`);
      toast.success("User Approved");
      fetchPendingUsers();
    } catch (error) {
      console.log(error);
      toast.error("Approval Failed");
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

  const handleSharedGoalChange = (e) => {
    setSharedGoal({ ...sharedGoal, [e.target.name]: e.target.value });
  };

  const pushSharedGoal = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...sharedGoal,
        employeeIds: sharedGoal.employeeIds.split(',').map(id => id.trim())
      };
      await axios.post(`${API_URL}/api/goals/shared`, payload);
      toast.success("Shared Goal Pushed Successfully");
      setSharedGoal({ employeeIds: "", thrustArea: "", title: "", description: "", uomType: "Numeric", targetValue: "", weightage: "" });
    } catch (error) {
      toast.error("Failed to push shared goal");
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-500">System audit logs, escalations, and administrative overrides.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200 pb-2 overflow-x-auto">
            {["audit", "escalations", "push_goal", "user_approvals"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-semibold capitalize px-4 py-2 rounded-lg transition-colors ${activeTab === tab ? "bg-[#eef2ff] text-[#4f46e5]" : "text-gray-500 hover:bg-gray-100"}`}
              >
                {tab.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "audit" && (
            <div>
              {logs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                  <p className="text-gray-500 text-sm">No audit logs available.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8">
                  {logs.map((log) => (
                    <div key={log.id} className="bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 rounded-xl p-5 relative flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Audit Log</h2>
                        <span className="bg-[#eef2ff] text-[#4f46e5] px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                          {log.action}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Target Goal</p>
                        <p className="text-sm font-semibold text-gray-800 leading-tight">{log.goal?.title || "Unknown Goal"}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 mb-4 grid grid-cols-1 gap-2 border border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Change Record</p>
                        <div className="flex items-center gap-2 text-sm font-mono bg-white p-2 rounded border border-gray-200">
                          <span className="text-red-500 line-through decoration-red-300">{log.oldValue}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600 font-semibold">{log.newValue}</span>
                        </div>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Timestamp</p>
                          <p className="text-xs text-gray-700 font-medium">{new Date(log.changedAt).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => unlockGoal(log.goalId)}
                          disabled={loadingGoalId === log.goalId}
                          className={`text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-colors shadow-sm ${loadingGoalId === log.goalId ? "bg-gray-400 text-white cursor-not-allowed" : "bg-white border border-[#f43f5e] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-white"}`}
                        >
                          {loadingGoalId === log.goalId ? "Unlocking..." : "Unlock Goal"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "escalations" && (
            <div>
              {escalations.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                  <p className="text-gray-500 text-sm">No active escalations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8">
                  {escalations.map((esc) => (
                    <div key={esc.id} className="bg-white shadow-sm hover:border-rose-400 transition-all border border-rose-100 rounded-xl p-5 relative flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-sm font-semibold text-rose-500 uppercase tracking-wide">{esc.ruleTriggered}</h2>
                        <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                          {esc.status}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-700 leading-relaxed">{esc.details}</p>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-2">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Timestamp</p>
                          <p className="text-xs text-gray-700 font-medium">{new Date(esc.createdAt).toLocaleString()}</p>
                        </div>
                        <button className="text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-colors shadow-sm bg-white border border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "push_goal" && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Push Departmental KPI</h2>
              <form onSubmit={pushSharedGoal} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Employee IDs (comma separated)</label>
                  <input type="text" name="employeeIds" value={sharedGoal.employeeIds} onChange={handleSharedGoalChange} required className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]" placeholder="e.g. 1, 2, 5" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Thrust Area</label>
                    <input type="text" name="thrustArea" value={sharedGoal.thrustArea} onChange={handleSharedGoalChange} required className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Goal Title</label>
                    <input type="text" name="title" value={sharedGoal.title} onChange={handleSharedGoalChange} required className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Description</label>
                  <textarea name="description" value={sharedGoal.description} onChange={handleSharedGoalChange} required rows="2" className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">UOM Type</label>
                    <select name="uomType" value={sharedGoal.uomType} onChange={handleSharedGoalChange} className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]">
                      <option>Numeric</option>
                      <option>Percentage</option>
                      <option>Timeline</option>
                      <option>Zero</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Target</label>
                    <input type="number" name="targetValue" value={sharedGoal.targetValue} onChange={handleSharedGoalChange} required className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Weightage</label>
                    <input type="number" name="weightage" value={sharedGoal.weightage} onChange={handleSharedGoalChange} required className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]" />
                  </div>
                </div>
                <button type="submit" className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors text-sm w-full mt-4">
                  Push Shared Goal
                </button>
              </form>
            </div>
          )}

          {activeTab === "user_approvals" && (
            <div>
              {pendingUsers.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                  <p className="text-gray-500 text-sm">No pending user registrations.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="bg-white shadow-sm hover:shadow-md transition-all border border-gray-100 rounded-xl p-5 relative flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide">
                          {user.role}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {user.email}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold">Employee ID:</span> {user.employeeCode || "N/A"}</p>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button
                          onClick={() => approveUser(user.id)}
                          className="bg-[#10b981] hover:bg-[#059669] text-white text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-lg transition-colors shadow-sm"
                        >
                          Approve User
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;