const prisma = require("../model/prisma");

exports.getMeterWater = async (req, res, next) => {
  try {
    const roomAdmin = await prisma.userRoom.findMany({
      where: {
        room: {
          adminId: req.user.id,
        },
      },
      include: {
        room: true,
      },
    });

    const { date } = req.params;
    if (!date) {
      return next(err);
    }
    const meterWater = await prisma.meterWater.findMany({
      where: { createAt: new Date(date) },
    });

    res.status(200).json({ roomAdmin, meterWater });
  } catch (err) {
    console.log(
      "🚀 ~ file: meter-controller.js:17 ~ exports.getMeterWater= ~ err:",
      err
    );
    next(err);
  }
};

exports.createMeterWater = async (req, res, next) => {
  try {
    const { priceUnit, unit, createAt, userRoomId, adminId } = req.body;

    const createMeterWater = await prisma.meterWater.create({
      data: {
        priceUnit,
        unit,
        createAt,
        userRoomId,
        adminId,
      },
    });
    res.status(201).json({ createMeterWater });
  } catch (err) {
    console.log(
      "🚀 ~ file: meter-controller.js:37 ~ exports.createMeterWater= ~ err:",
      err
    );
    next(err);
  }
};
exports.createMeterElectric = async (req, res, next) => {
  try {
    const { priceUnit, unit, createAt, userRoomId, adminId } = req.body;

    const createMeterWater = await prisma.meterElectric.create({
      data: {
        priceUnit,
        unit,
        createAt,
        userRoomId,
        adminId,
      },
    });
    res.status(201).json({ createMeterWater });
  } catch (err) {
    console.log(
      "🚀 ~ file: meter-controller.js:37 ~ exports.createMeterWater= ~ err:",
      err
    );
    next(err);
  }
};
