const router = require("express").Router();

const {
  createGoals,
  getEmployeeGoals,
  getPendingGoals,
  approveGoal,
  rejectGoal,
  exportGoals,
  pushSharedGoal,
  updateGoalWeightage,
  getAllGoals,
  getManagerGoals
} = require("../controllers/goalController");

router.post("/", createGoals);
router.post("/shared", pushSharedGoal);
router.put("/weightage/:id", updateGoalWeightage);

router.get("/all", getAllGoals);
router.get("/manager/:managerId", getManagerGoals);

router.get("/manager/pending/all", getPendingGoals);

router.get("/export/report", exportGoals);

router.get("/:employeeId", getEmployeeGoals);

router.put("/approve/:id", approveGoal);

router.put("/reject/:id", rejectGoal);

module.exports = router;