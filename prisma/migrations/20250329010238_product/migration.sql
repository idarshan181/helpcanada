/*
  Warnings:

  - The primary key for the `analytics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alternative_product_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_alternative_product_id_fkey";

-- AlterTable
ALTER TABLE "analytics" DROP CONSTRAINT "analytics_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "analytics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "analytics_id_seq";

-- AlterTable
ALTER TABLE "products" DROP CONSTRAINT "products_pkey",
DROP COLUMN "alternative_product_id",
ADD COLUMN     "cons" TEXT[],
ADD COLUMN     "organic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pros" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "products_id_seq";
