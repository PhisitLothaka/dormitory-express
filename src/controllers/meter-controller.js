const prisma = require("../model/prisma");

exports.getMeterWater = async (req, res, next) => {
  try {
    const roomAdmin = await prisma.userRoom.findMany({
      where: { adminId: req.user.id },
      include: {
        room: {
          include: {
            MeterWater: true,
          },
        },
      },
    });

    res.status(200).json({ roomAdmin });
  } catch (err) {
    next(err);
  }
};

exports.getMeterByDate = async (req, res, next) => {
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
      where: {
        OR: [{ createAt: new Date(date) }, { userRoomId: roomAdmin.id }],
      },
    });

    res.status(200).json({ meterWater });
  } catch (err) {
    next(err);
  }
};

exports.createMeterWater = async (req, res, next) => {
  try {
    const { priceUnit, unit, createAt, roomId, adminId } = req.body;

    const createMeterWater = await prisma.meterWater.create({
      data: {
        priceUnit,
        unit,
        createAt,
        roomId,
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
    const { priceUnit, unit, createAt, roomId, adminId } = req.body;

    const createMeterElectric = await prisma.meterElectric.create({
      data: {
        priceUnit,
        unit,
        createAt,
        roomId,
        adminId,
      },
    });
    res.status(201).json({ createMeterElectric });
  } catch (err) {
    console.log(
      "🚀 ~ file: meter-controller.js:37 ~ exports.createMeterWater= ~ err:",
      err
    );
    next(err);
  }
};
