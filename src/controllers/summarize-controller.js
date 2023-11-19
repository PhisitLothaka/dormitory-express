const prisma = require("../model/prisma");

exports.getSummarize = async (req, res, next) => {
  try {
    const summarize = await prisma.sumarize.findMany({
      where: {
        adminId: req.user.id,
      },
      include: {
        room: {
          select: {
            name: true,
            price: true,
          },
          // include: {
          //   userRoom: {
          //     statusPayment: true,
          //   },
          // },
        },

        user: {
          select: {
            firstName: true,
          },
        },
      },
    });
    res.status(200).json({ summarize });
  } catch (err) {
    next(err);
  }
};

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
