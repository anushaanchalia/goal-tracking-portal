import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = import.meta.env.VITE_API_URL;

const MyGoals = () => {

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

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-10 max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          My Goals
        </h1>

        {goals.length === 0 && (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <p className="text-gray-500 text-lg">
              No goals available yet.
            </p>

          </div>

        )}

        {goals.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {goals.map((goal) => {

              const progress =
                goal.targetValue > 0
                  ? Math.min(
                      (goal.achievementValue /
                        goal.targetValue) *
                        100,
                      100
                    )
                  : 0;

              return (

                <div
                  key={goal.id}
                  className="bg-white shadow-lg hover:shadow-xl transition rounded-2xl p-6 border"
                >

                  {/* Title */}

                  <div className="flex items-start justify-between mb-4">

                    <h2 className="text-2xl font-bold">
                      {goal.title}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        goal.approvalStatus === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : goal.approvalStatus === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {goal.approvalStatus}

                    </span>

                  </div>

                  {/* Description */}

                  <p className="mb-4 text-gray-600">
                    {goal.description}
                  </p>

                  {/* Details */}

                  <div className="space-y-2 text-sm">

                    <p>
                      <span className="font-bold">
                        Thrust Area:
                      </span>
                      {" "}
                      {goal.thrustArea}
                    </p>

                    <p>
                      <span className="font-bold">
                        UOM:
                      </span>
                      {" "}
                      {goal.uomType}
                    </p>

                    <p>
                      <span className="font-bold">
                        Target:
                      </span>
                      {" "}
                      {goal.targetValue}
                    </p>

                    <p>
                      <span className="font-bold">
                        Achievement:
                      </span>
                      {" "}
                      {goal.achievementValue}
                    </p>

                    <p>
                      <span className="font-bold">
                        Weightage:
                      </span>
                      {" "}
                      {goal.weightage}%
                    </p>

                    <p>
                      <span className="font-bold">
                        Status:
                      </span>
                      {" "}

                      <span
                        className={`font-semibold ${
                          goal.status === "Completed"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >

                        {goal.status}

                      </span>

                    </p>

                  </div>

                  {/* Progress */}

                  <div className="mt-6">

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        Progress
                      </span>

                      <span className="font-semibold">
                        {progress.toFixed(0)}%
                      </span>

                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                      <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`
                        }}
                      ></div>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

};

export default MyGoals;