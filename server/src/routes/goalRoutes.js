const router = require("express").Router();

const {
  createGoals,
  getEmployeeGoals,
  getPendingGoals,
  approveGoal,
  rejectGoal,
  exportGoals
} = require("../controllers/goalController");

router.post("/", createGoals);

router.get("/manager/pending/all", getPendingGoals);

router.get("/export/report", exportGoals);

router.get("/:employeeId", getEmployeeGoals);

router.put("/approve/:id", approveGoal);

router.put("/reject/:id", rejectGoal);

module.exports = router;