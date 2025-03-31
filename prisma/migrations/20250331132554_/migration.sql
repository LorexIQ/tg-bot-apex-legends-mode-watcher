-- CreateEnum
CREATE TYPE "Languages" AS ENUM ('ru');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "languageCode" "Languages" NOT NULL,
    "role" "Roles" NOT NULL,
    "isBot" BOOLEAN NOT NULL,
    "isPremium" BOOLEAN NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "notifyEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_key_key" ON "sessions"("key");
