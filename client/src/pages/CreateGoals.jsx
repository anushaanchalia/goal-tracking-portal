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
    const totalWeightage = goals.reduce((sum, goal) => sum + Number(goal.weightage), 0);
    if (totalWeightage !== 100) {
      toast.error("Total weightage must equal 100%");
      return;
    }
    for (let goal of goals) {
      if (goal.weightage < 10) {
        toast.error("Each goal minimum weightage is 10%");
        return;
      }
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/goals`, {
        employeeId: user.id,
        goals
      });
      toast.success("Goals Submitted Successfully");
      setLoading(false);
    } catch (error) {
      toast.error("Submission Failed");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col font-sans overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-gray-900">Create Goals</h1>
            <p className="text-sm text-gray-500">Define your objectives and key results for the quarter.</p>
          </div>

          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white border border-gray-100 p-4 lg:p-5 rounded-xl shadow-sm hover:shadow-md transition-all relative">
                
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">Goal #{index + 1}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1">Thrust Area</label>
                    <input
                      type="text"
                      name="thrustArea"
                      placeholder="e.g. Sales, Marketing"
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors"
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1">Goal Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Increase Revenue"
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors"
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1">Description</label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe the objective..."
                    rows="2"
                    className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors resize-none"
                    onChange={(e) => handleChange(index, e)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1">UOM Type</label>
                    <select
                      name="uomType"
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors bg-white cursor-pointer"
                      onChange={(e) => handleChange(index, e)}
                    >
                      <option>Numeric</option>
                      <option>Percentage</option>
                      <option>Timeline</option>
                      <option>Zero</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1">Target Value</label>
                    <input
                      type="number"
                      name="targetValue"
                      placeholder="0"
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors"
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wide mb-1">Weightage (%)</label>
                    <input
                      type="number"
                      name="weightage"
                      placeholder="10-100"
                      className="w-full border border-gray-200 text-sm p-2 rounded-lg focus:outline-none focus:border-[#5263f9] focus:ring-1 focus:ring-[#5263f9] transition-colors"
                      onChange={(e) => handleChange(index, e)}
                      required
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 pb-8">
            <button
              onClick={addGoal}
              className="bg-white border border-gray-200 hover:border-[#5263f9] hover:text-[#5263f9] text-gray-700 text-sm font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              + Add Goal
            </button>

            <button
              onClick={submitGoals}
              disabled={loading}
              className={`text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-sm ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#5263f9] hover:bg-[#4352d8] text-white hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {loading ? "Submitting..." : "Submit All Goals"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateGoals;