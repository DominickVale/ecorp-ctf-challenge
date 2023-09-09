-- CreateTable
CREATE TABLE "StaffUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "securityQuestion" TEXT NOT NULL DEFAULT 'What is your favourite colour?',
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StaffUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "bank" INTEGER NOT NULL,
    "friends" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "healthy" BOOLEAN NOT NULL,
    "mood" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffUser_username_key" ON "StaffUser"("username");
