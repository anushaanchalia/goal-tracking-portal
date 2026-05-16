const router = require("express").Router();

const {
  createCheckin,
  getGoalCheckins
} = require("../controllers/checkinController");

router.post("/", createCheckin);

router.get("/:goalId", getGoalCheckins);

module.exports = router;