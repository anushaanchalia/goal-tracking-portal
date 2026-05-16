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

      const response = await axios.get(
        `${API_URL}/api/admin/logs`
      );

      setLogs(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const unlockGoal = async (goalId) => {

    try {

      setLoadingGoalId(goalId);

      await axios.put(
        `${API_URL}/api/admin/unlock/${goalId}`
      );

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

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-10 max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Admin Dashboard
        </h1>

        {logs.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <p className="text-gray-500 text-lg">
              No audit logs available.
            </p>

          </div>

        )}

        {logs.length > 0 && (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {logs.map((log) => (

              <div
                key={log.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border"
              >

                {/* Action Badge */}

                <div className="flex justify-between items-center mb-4">

                  <h2 className="text-2xl font-bold">
                    Audit Log
                  </h2>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

                    {log.action}

                  </span>

                </div>

                {/* Goal */}

                <p className="mb-3">

                  <span className="font-bold">
                    Goal:
                  </span>

                  {" "}

                  {log.goal.title}

                </p>

                {/* Change */}

                <p className="mb-3">

                  <span className="font-bold">
                    Changed:
                  </span>

                  {" "}

                  <span className="text-red-600">
                    {log.oldValue}
                  </span>

                  {" → "}

                  <span className="text-green-600">
                    {log.newValue}
                  </span>

                </p>

                {/* Timestamp */}

                <p className="mb-5 text-gray-500 text-sm">

                  <span className="font-semibold">
                    Date:
                  </span>

                  {" "}

                  {new Date(
                    log.changedAt
                  ).toLocaleString()}

                </p>

                {/* Unlock Button */}

                <button
                  onClick={() =>
                    unlockGoal(log.goal.id)
                  }
                  disabled={
                    loadingGoalId === log.goal.id
                  }
                  className={`text-white px-5 py-3 rounded-lg transition ${
                    loadingGoalId === log.goal.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >

                  {loadingGoalId === log.goal.id
                    ? "Unlocking..."
                    : "Unlock Goal"}

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default AdminDashboard;