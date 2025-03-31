-- CreateTable
CREATE TABLE "notifies" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "meta" JSONB NOT NULL,

    CONSTRAINT "notifies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifies" ADD CONSTRAINT "notifies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
