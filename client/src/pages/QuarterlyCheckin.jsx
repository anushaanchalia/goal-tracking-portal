import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const QuarterlyCheckin = () => {

  const [goals, setGoals] = useState([]);

  const [formData, setFormData] = useState({});

  const [loadingGoalId, setLoadingGoalId] = useState(null);

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

  const handleChange = (goalId, field, value) => {

    setFormData({
      ...formData,
      [goalId]: {
        ...formData[goalId],
        [field]: value
      }
    });

  };

  const submitCheckin = async (goalId) => {

    try {

      const data = formData[goalId];

      if (
        !data ||
        !data.quarter ||
        !data.plannedValue ||
        !data.actualValue
      ) {

        toast.error(
          "Please fill all required fields"
        );

        return;

      }

      setLoadingGoalId(goalId);

      await axios.post(
        `${API_URL}/api/checkins`,
        {
          goalId,
          quarter: data.quarter,
          plannedValue: Number(data.plannedValue),
          actualValue: Number(data.actualValue),
          employeeComment: data.employeeComment
        }
      );

      toast.success("Check-in Submitted");

      setLoadingGoalId(null);

      fetchGoals();

    } catch (error) {

      console.log(error);

      toast.error("Submission Failed");

      setLoadingGoalId(null);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-10 max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Quarterly Check-ins
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {goals.map((goal) => (

            <div
              key={goal.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border"
            >

              <h2 className="text-2xl font-bold mb-3">
                {goal.title}
              </h2>

              <p className="mb-2">
                <span className="font-semibold">
                  Target:
                </span>

                {" "}

                {goal.targetValue}
              </p>

              <p className="mb-4">
                <span className="font-semibold">
                  Current Achievement:
                </span>

                {" "}

                {goal.achievementValue}
              </p>

              <select
                className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleChange(
                    goal.id,
                    "quarter",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Quarter
                </option>

                <option value="Q1">
                  Q1
                </option>

                <option value="Q2">
                  Q2
                </option>

                <option value="Q3">
                  Q3
                </option>

                <option value="Q4">
                  Q4
                </option>

              </select>

              <input
                type="number"
                placeholder="Planned Value"
                className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleChange(
                    goal.id,
                    "plannedValue",
                    e.target.value
                  )
                }
                required
              />

              <input
                type="number"
                placeholder="Actual Achievement"
                className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleChange(
                    goal.id,
                    "actualValue",
                    e.target.value
                  )
                }
                required
              />

              <textarea
                placeholder="Employee Comment"
                className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) =>
                  handleChange(
                    goal.id,
                    "employeeComment",
                    e.target.value
                  )
                }
              />

              <button
                onClick={() =>
                  submitCheckin(goal.id)
                }
                disabled={
                  loadingGoalId === goal.id
                }
                className={`text-white px-5 py-3 rounded-lg transition ${
                  loadingGoalId === goal.id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >

                {loadingGoalId === goal.id
                  ? "Submitting..."
                  : "Submit Check-in"}

              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default QuarterlyCheckin;