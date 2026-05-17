const cron = require("node-cron");
const prisma = require("../config/prisma");

// Run every hour in production, but for demo we can set it to run more frequently or just call it manually
const initCronJobs = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running escalation check...");
    try {
      // Find pending goals older than 7 days
      const pendingGoals = await prisma.goal.findMany({
        where: {
          approvalStatus: "PENDING",
          createdAt: {
            lte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
          }
        },
        include: { employee: true }
      });

      for (const goal of pendingGoals) {
        // Check if an escalation already exists
        const existing = await prisma.escalationLog.findFirst({
          where: { ruleTriggered: "OVERDUE_APPROVAL", employeeId: goal.employeeId, status: "PENDING" }
        });

        if (!existing) {
          await prisma.escalationLog.create({
            data: {
              ruleTriggered: "OVERDUE_APPROVAL",
              details: `Goal "${goal.title}" submitted by ${goal.employee.name} has been pending approval for over 7 days. Escalated to Manager.`,
              employeeId: goal.employeeId,
              managerId: goal.employee.managerId
            }
          });
          console.log(`Escalation created for goal: ${goal.id}`);
        }
      }
    } catch (error) {
      console.error("Cron Error:", error);
    }
  });
};

module.exports = initCronJobs;
