const prisma = require("../config/prisma");

exports.createGoals = async (req, res) => {
  try {
    const { employeeId, goals } = req.body;

    const createdGoals = [];

    for (const goal of goals) {
      const created = await prisma.goal.create({
        data: {
          employeeId,
          thrustArea: goal.thrustArea,
          title: goal.title,
          description: goal.description,
          uomType: goal.uomType,
          targetValue: Number(goal.targetValue),
          weightage: Number(goal.weightage),
        },
      });

      createdGoals.push(created);
    }

    res.json(createdGoals);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getEmployeeGoals = async (req, res) => {
  try {
    const employeeId = Number(req.params.employeeId);

    const goals = await prisma.goal.findMany({
      where: {
        employeeId,
      },
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getPendingGoals = async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      where: {
        approvalStatus: "PENDING",
      },
      include: {
        employee: true,
      },
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.approveGoal = async (req, res) => {
  try {
    const goalId = Number(req.params.id);

    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        approvalStatus: "APPROVED",
        isLocked: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "GOAL_APPROVED",
        oldValue: "PENDING",
        newValue: "APPROVED",
        goalId: goalId,
      },
    });

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.rejectGoal = async (req, res) => {
  try {
    const goalId = Number(req.params.id);

    const { managerComment } = req.body;

    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        approvalStatus: "REJECTED",
        managerComment,
        isLocked: false,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "GOAL_REJECTED",
        oldValue: "PENDING",
        newValue: "REJECTED",
        goalId: goalId,
      },
    });

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const { Parser } = require("json2csv");

exports.exportGoals = async (req, res) => {
  try {
    const goals = await prisma.goal.findMany({
      include: {
        employee: true,
      },
    });

    const formattedGoals = goals.map((goal) => ({
      Employee: goal.employee.name,
      Goal: goal.title,
      Target: goal.targetValue,
      Achievement: goal.achievementValue,
      Weightage: goal.weightage,
      Approval: goal.approvalStatus,
    }));

    const parser = new Parser();

    const csv = parser.parse(formattedGoals);

    res.header("Content-Type", "text/csv");

    res.attachment("goals-report.csv");

    return res.send(csv);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
