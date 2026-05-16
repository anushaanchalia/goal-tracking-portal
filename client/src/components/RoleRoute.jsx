import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, role }) => {

  const storedUser = localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  // If no user exists

  if (!user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  // If role does not match

  if (user.role !== role) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  // Authorized user

  return children;

};

export default RoleRoute;