import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  const user = localStorage.getItem("user");

  // If not authenticated

  if (!token || !user) {

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  // If authenticated

  return children;

};

export default ProtectedRoute;