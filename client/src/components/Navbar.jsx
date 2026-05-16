import toast from "react-hot-toast";

const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.clear();

    toast.success("Logged out successfully");

    setTimeout(() => {

      window.location.href = "/";

    }, 1000);

  };

  return (

    <div className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">

      {/* Logo */}

      <h1 className="text-2xl font-bold">
        Goal Portal
      </h1>

      {/* Navigation Links */}

      <div className="flex gap-4 items-center flex-wrap">

        {/* Employee Links */}

        <a
          href="/dashboard"
          className="hover:text-gray-200 transition"
        >
          Dashboard
        </a>

        <a
          href="/create-goals"
          className="hover:text-gray-200 transition"
        >
          Create Goals
        </a>

        <a
          href="/my-goals"
          className="hover:text-gray-200 transition"
        >
          My Goals
        </a>

        <a
          href="/checkins"
          className="hover:text-gray-200 transition"
        >
          Check-ins
        </a>

        <a
          href="/analytics"
          className="hover:text-gray-200 transition"
        >
          Analytics
        </a>

        {/* Manager Links */}

        {user?.role === "MANAGER" && (

          <a
            href="/manager"
            className="hover:text-gray-200 transition"
          >
            Manager
          </a>

        )}

        {/* Admin Links */}

        {user?.role === "ADMIN" && (

          <a
            href="/admin"
            className="hover:text-gray-200 transition"
          >
            Admin
          </a>

        )}

        {/* User Name */}

        <p className="font-semibold ml-4">
          {user?.name}
        </p>

        {/* Logout */}

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition"
        >
          Logout
        </button>

      </div>

    </div>

  );

};

export default Navbar;