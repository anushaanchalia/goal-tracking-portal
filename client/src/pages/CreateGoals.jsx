import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const CreateGoals = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const [goals, setGoals] = useState([
    {
      thrustArea: "",
      title: "",
      description: "",
      uomType: "Numeric",
      targetValue: "",
      weightage: ""
    }
  ]);

  const handleChange = (index, e) => {

    const updatedGoals = [...goals];

    updatedGoals[index][e.target.name] = e.target.value;

    setGoals(updatedGoals);

  };

  const addGoal = () => {

    if (goals.length >= 8) {

      toast.error("Maximum 8 goals allowed");

      return;

    }

    setGoals([
      ...goals,
      {
        thrustArea: "",
        title: "",
        description: "",
        uomType: "Numeric",
        targetValue: "",
        weightage: ""
      }
    ]);

  };

  const submitGoals = async () => {

    const totalWeightage = goals.reduce(
      (sum, goal) => sum + Number(goal.weightage),
      0
    );

    if (totalWeightage !== 100) {

      toast.error(
        "Total weightage must equal 100%"
      );

      return;

    }

    for (let goal of goals) {

      if (goal.weightage < 10) {

        toast.error(
          "Each goal minimum weightage is 10%"
        );

        return;

      }

    }

    try {

      setLoading(true);

      await axios.post(
        `${API_URL}/api/goals`,
        {
          employeeId: user.id,
          goals
        }
      );

      toast.success(
        "Goals Submitted Successfully"
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error("Submission Failed");

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-10 max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Create Goals
        </h1>

        {goals.map((goal, index) => (

          <div
            key={index}
            className="border p-5 rounded-2xl mb-6 bg-white shadow-lg hover:shadow-xl transition"
          >

            <input
              type="text"
              name="thrustArea"
              placeholder="Thrust Area"
              className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(index, e)
              }
              required
            />

            <input
              type="text"
              name="title"
              placeholder="Goal Title"
              className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(index, e)
              }
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(index, e)
              }
              required
            />

            <select
              name="uomType"
              className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(index, e)
              }
            >

              <option>
                Numeric
              </option>

              <option>
                Percentage
              </option>

              <option>
                Timeline
              </option>

              <option>
                Zero
              </option>

            </select>

            <input
              type="number"
              name="targetValue"
              placeholder="Target Value"
              className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(index, e)
              }
              required
            />

            <input
              type="number"
              name="weightage"
              placeholder="Weightage"
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                handleChange(index, e)
              }
              required
            />

          </div>

        ))}

        <div className="flex flex-wrap gap-4">

          <button
            onClick={addGoal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
          >
            Add Goal
          </button>

          <button
            onClick={submitGoals}
            disabled={loading}
            className={`text-white px-5 py-3 rounded-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >

            {loading
              ? "Submitting..."
              : "Submit Goals"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default CreateGoals;