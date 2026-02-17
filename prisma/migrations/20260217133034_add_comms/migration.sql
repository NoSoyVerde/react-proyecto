-- CreateEnum
CREATE TYPE "CommMethod" AS ENUM ('MAIL', 'PHONE');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "comms" "CommMethod" NOT NULL DEFAULT 'MAIL',
ADD COLUMN     "phone" TEXT;
