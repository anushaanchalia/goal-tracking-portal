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
      const response = await axios.get(`${API_URL}/api/goals/${user.id}`);
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

      if (!data || !data.quarter || !data.plannedValue || !data.actualValue) {
        toast.error("Please fill all required fields");
        return;
      }

      setLoadingGoalId(goalId);

      await axios.post(`${API_URL}/api/checkins`, {
        goalId,
        quarter: data.quarter,
        plannedValue: Number(data.plannedValue),
        actualValue: Number(data.actualValue),
        employeeComment: data.employeeComment
      });

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
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Quarterly Check-ins</h1>
            <p className="text-sm text-gray-500">Submit your quarterly reviews and track progress.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{goal.title}</h2>
                
                <div className="flex gap-4 mb-4 text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <p><span className="font-semibold text-gray-700">Target:</span> {goal.targetValue}</p>
                  <p><span className="font-semibold text-gray-700">Achieved:</span> {goal.achievementValue}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <select
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors bg-white cursor-pointer"
                      onChange={(e) => handleChange(goal.id, "quarter", e.target.value)}
                    >
                      <option value="">Select Quarter</option>
                      <option value="Q1">Q1</option>
                      <option value="Q2">Q2</option>
                      <option value="Q3">Q3</option>
                      <option value="Q4">Q4</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Planned Val."
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors"
                      onChange={(e) => handleChange(goal.id, "plannedValue", e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Actual Val."
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors"
                      onChange={(e) => handleChange(goal.id, "actualValue", e.target.value)}
                      required
                    />
                  </div>

                  <textarea
                    placeholder="Employee Comment (optional)"
                    rows="2"
                    className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors resize-none"
                    onChange={(e) => handleChange(goal.id, "employeeComment", e.target.value)}
                  />

                  <button
                    onClick={() => submitCheckin(goal.id)}
                    disabled={loadingGoalId === goal.id}
                    className={`w-full text-sm font-bold py-2.5 rounded-lg transition-colors shadow-sm mt-2 ${
                      loadingGoalId === goal.id
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-[#5263f9] hover:bg-[#4352d8] text-white"
                    }`}
                  >
                    {loadingGoalId === goal.id ? "Submitting..." : "Submit Check-in"}
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuarterlyCheckin;