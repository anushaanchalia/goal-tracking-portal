import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiDownload } from "react-icons/fi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {

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

  const statusData = [
    {
      name: "Completed",
      value: goals.filter((g) => g.achievementValue >= g.targetValue).length,
    },
    {
      name: "Pending",
      value: goals.filter((g) => g.achievementValue < g.targetValue).length,
    },
  ];

  const progressData = goals.map((goal) => ({
    name: goal.title,
    progress: goal.achievementValue,
  }));

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">Analytics Dashboard</h1>
              <p className="text-sm text-gray-500">Visual breakdown of your quarterly performance.</p>
            </div>

            <a
              href={`${API_URL}/api/goals/export/report`}
              className="bg-white border border-gray-200 hover:border-[#5263f9] hover:text-[#5263f9] text-gray-700 text-sm font-bold px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-all"
            >
              <FiDownload /> Export CSV
            </a>
          </div>

          {goals.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500 text-sm">No analytics data available yet.</p>
            </div>
          )}

          {goals.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
              
              {/* Pie Chart */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Goal Completion</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" outerRadius={90} label>
                      <Cell fill="#10b981" />
                      <Cell fill="#f43f5e" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Goal Progress</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: '#f3f4f6' }} />
                    <Bar dataKey="progress" fill="#5263f9" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Analytics;