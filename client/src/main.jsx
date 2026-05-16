import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(

  <StrictMode>

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{

        duration: 3000,

        style: {
          background: "#ffffff",
          color: "#111827",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.1)"
        },

        success: {
          style: {
            border: "1px solid #22c55e"
          }
        },

        error: {
          style: {
            border: "1px solid #ef4444"
          }
        }

      }}
    />

    <App />

  </StrictMode>

);