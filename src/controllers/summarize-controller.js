const prisma = require("../model/prisma");

exports.createSummarize = async (req, res, next) => {
  try {
    const {
      unitWater,
      priceUnitWater,
      unitElectric,
      priceUnitElectric,
      priceRoom,
      totalPrice,
      timeReceipt,
      roomId,
      userId,
      adminId,
    } = req.body;

    const summarize = await prisma.Sumarize.create({
      data: {
        unitWater,
        priceUnitWater,
        unitElectric,
        priceUnitElectric,
        priceRoom,
        totalPrice,
        timeReceipt,
        userId,
        roomId,
        adminId,
      },
    });
    console.log(
      "🚀 ~ file: summarize-controller.js:28 ~ exports.createSummarize= ~ summarize:",
      summarize
    );

    res.status(201).json({ summarize });
  } catch (err) {
    console.log(
      "🚀 ~ file: summarize-controller.js:31 ~ exports.createSummarize= ~ err:",
      err
    );
    next(err);
  }
};

exports.editStatusPayment = (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
