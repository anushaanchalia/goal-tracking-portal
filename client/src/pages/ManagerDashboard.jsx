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

      const response = await axios.get(
        `${API_URL}/api/goals/manager/pending/all`
      );

      setGoals(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const approveGoal = async (id) => {

    try {

      setLoadingId(id);

      await axios.put(
        `${API_URL}/api/goals/approve/${id}`
      );

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

      await axios.put(
        `${API_URL}/api/goals/reject/${id}`,
        {
          managerComment: comments[id] || ""
        }
      );

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

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-10 max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Manager Dashboard
        </h1>

        {goals.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <p className="text-gray-500 text-lg">
              No pending goals available.
            </p>

          </div>

        )}

        {goals.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {goals.map((goal) => (

              <div
                key={goal.id}
                className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-6 border"
              >

                <h2 className="text-2xl font-bold mb-2">
                  {goal.title}
                </h2>

                <p className="mb-4 text-gray-600">
                  {goal.description}
                </p>

                <div className="space-y-2">

                  <p>
                    <strong>Employee:</strong>
                    {" "}
                    {goal.employee.name}
                  </p>

                  <p>
                    <strong>Weightage:</strong>
                    {" "}
                    {goal.weightage}%
                  </p>

                  <p>
                    <strong>Status:</strong>
                    {" "}

                    <span className="text-yellow-600 font-semibold">
                      {goal.approvalStatus}
                    </span>

                  </p>

                </div>

                <textarea
                  placeholder="Manager Comment"
                  className="w-full border p-3 rounded mt-5 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    setComments({
                      ...comments,
                      [goal.id]: e.target.value
                    })
                  }
                />

                <div className="flex flex-wrap gap-4 mt-5">

                  <button
                    onClick={() =>
                      approveGoal(goal.id)
                    }
                    disabled={
                      loadingId === goal.id
                    }
                    className={`text-white px-5 py-3 rounded-lg transition ${
                      loadingId === goal.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >

                    {loadingId === goal.id
                      ? "Processing..."
                      : "Approve"}

                  </button>

                  <button
                    onClick={() =>
                      rejectGoal(goal.id)
                    }
                    disabled={
                      loadingId === goal.id
                    }
                    className={`text-white px-5 py-3 rounded-lg transition ${
                      loadingId === goal.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >

                    {loadingId === goal.id
                      ? "Processing..."
                      : "Reject"}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default ManagerDashboard;