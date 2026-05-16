import Navbar from "../components/Navbar";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div>

      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-4 text-center">
          Dashboard
        </h1>

        <p className="text-xl text-center">
          Welcome {user?.name}
        </p>

        <p className="mt-2 text-center">
          Role: {user?.role}
        </p>

        <div className="mt-10 flex gap-4 flex-wrap justify-center">

          {/* Employee Features */}

          <a
            href="/create-goals"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded transition"
          >
            Create Goals
          </a>

          <a
            href="/my-goals"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded transition"
          >
            View Goals
          </a>

          <a
            href="/checkins"
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded transition"
          >
            Quarterly Check-ins
          </a>

          <a
            href="/analytics"
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded transition"
          >
            Analytics
          </a>

          {/* Manager Features */}

          {user?.role === "MANAGER" && (

            <a
              href="/manager"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded transition"
            >
              Manager Dashboard
            </a>

          )}

          {/* Admin Features */}

          {user?.role === "ADMIN" && (

            <a
              href="/admin"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded transition"
            >
              Admin Dashboard
            </a>

          )}

        </div>

      </div>

    </div>

  );

};

export default Dashboard;