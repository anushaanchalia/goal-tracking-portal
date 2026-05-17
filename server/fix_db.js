const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  try {
    const users = await prisma.user.findMany();
    for (let i = 0; i < users.length; i++) {
      await prisma.user.update({
        where: { id: users[i].id },
        data: {
          accountStatus: "APPROVED",
          employeeCode: users[i].employeeCode || `EMP-${1000 + i}`
        }
      });
    }
    console.log("Successfully approved all existing users and assigned employee codes.");
  } catch (error) {
    console.error("Error fixing DB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

fix();
