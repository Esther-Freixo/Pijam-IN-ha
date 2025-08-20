/*
  Warnings:

  - You are about to drop the `Pajama` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PajamaSize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pajama";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PajamaSize";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "season" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "on_sale" BOOLEAN NOT NULL,
    "sale_percent" REAL
);

-- CreateTable
CREATE TABLE "pajamasSize" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stock_quantity" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "pajamasSize_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sale_pajamas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "saleId" TEXT NOT NULL,
    "pajamaId" TEXT NOT NULL,
    CONSTRAINT "Sale_pajamas_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Sale_pajamas_pajamaId_fkey" FOREIGN KEY ("pajamaId") REFERENCES "pajamas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sale_pajamas" ("id", "pajamaId", "price", "quantity", "saleId") SELECT "id", "pajamaId", "price", "quantity", "saleId" FROM "Sale_pajamas";
DROP TABLE "Sale_pajamas";
ALTER TABLE "new_Sale_pajamas" RENAME TO "Sale_pajamas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
