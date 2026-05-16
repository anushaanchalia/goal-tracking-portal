const router = require("express").Router();

const {
  getAuditLogs,
  unlockGoal
} = require("../controllers/adminController");

router.get("/logs", getAuditLogs);

router.put("/unlock/:id", unlockGoal);

module.exports = router;