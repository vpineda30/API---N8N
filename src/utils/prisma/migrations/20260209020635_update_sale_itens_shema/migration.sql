/*
  Warnings:

  - Added the required column `category` to the `sale_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `sale_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `sale_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `sale_items` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sale_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "priceAtSale" REAL NOT NULL,
    CONSTRAINT "sale_items_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "sales" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sale_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sale_items" ("id", "priceAtSale", "productId", "quantity", "saleId") SELECT "id", "priceAtSale", "productId", "quantity", "saleId" FROM "sale_items";
DROP TABLE "sale_items";
ALTER TABLE "new_sale_items" RENAME TO "sale_items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
