-- AlterTable
ALTER TABLE `sumarize` ADD COLUMN `checkPayment` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `timeReceipt` DATETIME(3) NOT NULL;
