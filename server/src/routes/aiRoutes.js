const router = require("express").Router();
const { refineGoal } = require("../controllers/aiController");

router.post("/refine-goal", refineGoal);

module.exports = router;
