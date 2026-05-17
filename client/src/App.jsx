import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateGoals from "./pages/CreateGoals";
import MyGoals from "./pages/MyGoals";
import ManagerDashboard from "./pages/ManagerDashboard";
import QuarterlyCheckin from "./pages/QuarterlyCheckin";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const msalConfig = {
  auth: {
    clientId: "YOUR_MICROSOFT_CLIENT_ID", // Placeholder for Microsoft Client ID
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "/",
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

function App() {

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>

          <Routes>

            {/* Public Routes */}

            <Route
              path="/"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            {/* Protected Employee Routes */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-goals"
              element={
                <ProtectedRoute>
                  <CreateGoals />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-goals"
              element={
                <ProtectedRoute>
                  <MyGoals />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkins"
              element={
                <ProtectedRoute>
                  <QuarterlyCheckin />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Manager Routes */}

            <Route
              path="/manager"
              element={
                <ProtectedRoute>

                  <RoleRoute role="MANAGER">

                    <ManagerDashboard />

                  </RoleRoute>

                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute>

                  <RoleRoute role="ADMIN">

                    <AdminDashboard />

                  </RoleRoute>

                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}

            <Route
              path="*"
              element={<Navigate to="/" />}
            />

          </Routes>

        </BrowserRouter>
      </MsalProvider>
    </GoogleOAuthProvider>
  );

}

export default App;