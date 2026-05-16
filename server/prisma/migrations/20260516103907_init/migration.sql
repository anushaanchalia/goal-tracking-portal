-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "department" TEXT,
    "managerId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thrustArea" TEXT NOT NULL,
    "uomType" TEXT NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "achievementValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weightage" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Not Started',
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "employeeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
