-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "approvalStatus" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "managerComment" TEXT;
