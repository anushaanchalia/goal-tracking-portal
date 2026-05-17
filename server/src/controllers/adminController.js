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

exports.getEscalationLogs = async (req, res) => {
  try {
    const logs = await prisma.escalationLog.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPendingUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { accountStatus: "PENDING" },
      orderBy: { id: "asc" }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { accountStatus: "APPROVED" }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};