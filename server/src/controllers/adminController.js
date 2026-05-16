const prisma = require("../config/prisma");

exports.getAuditLogs = async (req, res) => {

  try {

    const logs = await prisma.auditLog.findMany({
      include: {
        goal: true
      },
      orderBy: {
        changedAt: "desc"
      }
    });

    res.json(logs);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

exports.unlockGoal = async (req, res) => {

  try {

    const goalId = Number(req.params.id);

    const goal = await prisma.goal.update({
      where: {
        id: goalId
      },
      data: {
        isLocked: false,
        approvalStatus: "PENDING"
      }
    });

    await prisma.auditLog.create({
      data: {
        action: "GOAL_UNLOCKED",
        oldValue: "LOCKED",
        newValue: "UNLOCKED",
        goalId
      }
    });

    res.json(goal);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};