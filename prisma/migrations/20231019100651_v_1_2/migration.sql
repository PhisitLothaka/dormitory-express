/*
  Warnings:

  - Added the required column `priceUnitElectric` to the `Sumarize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceUnitWater` to the `Sumarize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Sumarize` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meterelectric` ADD COLUMN `unitUsed` INTEGER NULL;

-- AlterTable
ALTER TABLE `meterwater` ADD COLUMN `unitUsed` INTEGER NULL;

-- AlterTable
ALTER TABLE `sumarize` ADD COLUMN `priceUnitElectric` INTEGER NOT NULL,
    ADD COLUMN `priceUnitWater` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` INTEGER NOT NULL;
