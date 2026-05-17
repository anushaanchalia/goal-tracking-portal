import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FiDownload, FiTrendingUp, FiTarget, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  AreaChart, Area, Legend
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
      let endpoint = `${API_URL}/api/goals/${user.id}`;
      if (user.role === "ADMIN") {
        endpoint = `${API_URL}/api/goals/all`;
      } else if (user.role === "MANAGER") {
        endpoint = `${API_URL}/api/goals/manager/${user.id}`;
      }
      
      const response = await axios.get(endpoint);
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completedCount = goals.filter((g) => g.achievementValue >= g.targetValue).length;
  const pendingCount = goals.length - completedCount;

  const statusData = [
    { name: "Completed", value: completedCount },
    { name: "Pending", value: pendingCount },
  ];

  const progressData = goals.map((goal) => ({
    name: goal.title.substring(0, 15) + '...',
    progress: goal.achievementValue,
    target: goal.targetValue,
  }));

  const mockQoQData = [
    { name: 'Q1', achievement: 65, target: 80 },
    { name: 'Q2', achievement: 75, target: 80 },
    { name: 'Q3', achievement: 85, target: 80 },
    { name: 'Q4', achievement: 92, target: 90 },
  ];

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden text-gray-900">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 pb-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Organization Analytics
              </h1>
              <p className="text-sm text-gray-500 mt-1">Real-time insights into goal progression and metrics.</p>
            </div>

            <a
              href={`${API_URL}/api/goals/export/report`}
              className="bg-[#5263f9] hover:bg-[#4352d8] text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2 transition-all"
            >
              <FiDownload /> Download CSV Report
            </a>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Goals</p>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FiTarget className="text-lg" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{goals.length}</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Completed</p>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FiCheckCircle className="text-lg" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{completedCount}</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Pending</p>
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FiAlertCircle className="text-lg" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{pendingCount}</h3>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-2">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Avg Progress</p>
                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FiTrendingUp className="text-lg" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">78%</h3>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Area Chart: QoQ */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Quarter-on-Quarter (QoQ) Trend</h2>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={mockQoQData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5263f9" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#5263f9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} tickLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Area type="monotone" dataKey="achievement" name="Achievement" stroke="#5263f9" strokeWidth={3} fillOpacity={1} fill="url(#colorAch)" />
                  <Area type="monotone" dataKey="target" name="Target" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center">
              <h2 className="text-lg font-bold text-gray-800 mb-6 w-full text-left">Goal Completion Split</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5}>
                    <Cell fill="#10b981" />
                    <Cell fill="#f43f5e" />
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Bar Chart: Progress per Goal */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Goal Progress vs Target</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="progress" name="Achievement" fill="#5263f9" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="target" name="Target" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;