const prisma = require("../config/prisma");

exports.createCheckin = async (req, res) => {

  try {

    const {
      goalId,
      quarter,
      plannedValue,
      actualValue,
      employeeComment
    } = req.body;

    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId
      }
    });

    let progressScore = 0;

    if (goal.uomType === "Numeric" || goal.uomType === "Percentage") {

      progressScore =
        (actualValue / plannedValue) * 100;

    }

    if (goal.uomType === "Zero") {

      progressScore =
        actualValue === 0 ? 100 : 0;

    }

    const checkin = await prisma.checkin.create({
      data: {
        goalId,
        quarter,
        plannedValue,
        actualValue,
        progressScore,
        employeeComment
      }
    });

    await prisma.goal.update({
      where: {
        id: goalId
      },
      data: {
        achievementValue: actualValue
      }
    });

    res.json(checkin);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};

exports.getGoalCheckins = async (req, res) => {

  try {

    const goalId = Number(req.params.goalId);

    const checkins = await prisma.checkin.findMany({
      where: {
        goalId
      }
    });

    res.json(checkins);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

};