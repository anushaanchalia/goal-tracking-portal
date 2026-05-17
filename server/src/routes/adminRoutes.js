const router = require("express").Router();

const {
  getAuditLogs,
  unlockGoal,
  getEscalationLogs,
  getPendingUsers,
  approveUser
} = require("../controllers/adminController");

router.get("/logs", getAuditLogs);
router.get("/escalations", getEscalationLogs);
router.get("/users/pending", getPendingUsers);

router.put("/unlock/:id", unlockGoal);
router.put("/users/approve/:id", approveUser);

module.exports = router;