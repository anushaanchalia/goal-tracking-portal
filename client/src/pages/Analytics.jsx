import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

      const response = await axios.get(
        `${API_URL}/api/goals/${user.id}`
      );

      setGoals(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const statusData = [
    {
      name: "Completed",
      value: goals.filter(
        (g) => g.achievementValue >= g.targetValue
      ).length,
    },
    {
      name: "Pending",
      value: goals.filter(
        (g) => g.achievementValue < g.targetValue
      ).length,
    },
  ];

  const progressData = goals.map((goal) => ({
    name: goal.title,
    progress: goal.achievementValue,
  }));

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-10 max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">

          <h1 className="text-4xl font-bold">
            Analytics Dashboard
          </h1>

          <a
            href={`${API_URL}/api/goals/export/report`}
            className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-3 rounded-lg shadow-md"
          >
            Export CSV Report
          </a>

        </div>

        {goals.length === 0 && (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <p className="text-gray-500 text-lg">
              No analytics data available yet.
            </p>

          </div>

        )}

        {goals.length > 0 && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Pie Chart */}

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">

              <h2 className="text-2xl font-bold mb-6">
                Goal Completion
              </h2>

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={statusData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    <Cell fill="#22c55e" />

                    <Cell fill="#ef4444" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

            {/* Bar Chart */}

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">

              <h2 className="text-2xl font-bold mb-6">
                Goal Progress
              </h2>

              <ResponsiveContainer width="100%" height={320}>

                <BarChart data={progressData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="progress"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default Analytics;