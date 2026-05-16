-- CreateTable
CREATE TABLE "Checkin" (
    "id" SERIAL NOT NULL,
    "quarter" TEXT NOT NULL,
    "plannedValue" DOUBLE PRECISION NOT NULL,
    "actualValue" DOUBLE PRECISION NOT NULL,
    "progressScore" DOUBLE PRECISION NOT NULL,
    "employeeComment" TEXT,
    "managerComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "Checkin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
