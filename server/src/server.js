const express = require("express");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const checkinRoutes = require("./routes/checkinRoutes");
const adminRoutes = require("./routes/adminRoutes");
const initCronJobs = require("./utils/cronJobs");

const app = express();

initCronJobs();

/* CORS */

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

/* Middleware */

app.use(express.json());

/* Routes */

app.use("/api/auth", authRoutes);

app.use("/api/goals", goalRoutes);

app.use("/api/checkins", checkinRoutes);

app.use("/api/admin", adminRoutes);

/* Health Route */

app.get("/", (req, res) => {

  res.status(200).json({
    success: true,
    message: "Goal Tracking Portal API Running"
  });

});

/* Server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});