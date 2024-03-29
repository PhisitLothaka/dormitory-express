const prisma = require("../model/prisma");
const createError = require("../utils/create-error");
const { checkArrayMeterSchema } = require("../validators/meter-validator");

exports.getMeterElectricByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    if (!date) {
      return next(err);
    }

    const roomAdmin = await prisma.userRoom.findMany({
      where: { adminId: req.user.id },
      include: {
        room: {
          include: {
            MeterElectric: {
              where: {
                createAt: {
                  lte: new Date(date),
                },
              },
              take: 1,
              orderBy: {
                createAt: "desc",
              },
            },
          },
        },
      },
    });
    const roomMeter = roomAdmin.map((room, idx) => ({
      roomId: room?.room?.id,
      name: room?.room?.name,
      priceUnit: room?.room?.MeterElectric[0]?.priceUnit || 8,
      unit: room?.room?.MeterElectric[0]?.unit,
      unitUsed: room?.room?.MeterElectric[0]?.unitUsed,
    }));

    res.status(200).json(roomMeter);
  } catch (err) {
    next(err);
  }
};

exports.getMeterByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    if (!date) {
      return next(err);
    }

    const roomAdmin = await prisma.userRoom.findMany({
      where: { adminId: req.user.id },
      include: {
        room: {
          include: {
            MeterWater: {
              where: {
                createAt: { lte: new Date(date) },
              },
              take: 1,
              orderBy: {
                createAt: "desc",
              },
            },
          },
        },
      },
    });

    const roomMeter = roomAdmin.map((room, idx) => ({
      roomId: room?.room?.id,
      name: room?.room?.name,
      priceUnit: room?.room?.MeterWater[0]?.priceUnit || 8,
      unit: room?.room?.MeterWater[0]?.unit,
      unitUsed: room?.room?.MeterWater[0]?.unitUsed,
    }));

    res.status(200).json(roomMeter);
  } catch (err) {
    next(err);
  }
};

exports.createMeterWater = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.unitUsed) {
      delete data.unitUsed;
    }
    console.log("🚀 ~ exports.createMeterWater= ~ data:", data);
    const { value, error } = checkArrayMeterSchema.validate(data);

    if (error) {
      return next(error);
    }
    if (req.role !== "ADMIN") {
      return next(createError("You are not an admin.", 400));
    }
    value.adminId = req.user.id;

    await prisma.meterWater.create({
      data: value,
    });

    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.createMeterElectric = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.unitUsed) {
      delete data.unitUsed;
    }
    const { value, error } = checkArrayMeterSchema.validate(data);
    if (error) {
      return next(error);
    }

    value.adminId = req.user.id;

    const createMeterElectric = await prisma.meterElectric.createMany({
      data: value,
    });
    res.status(201).json({ createMeterElectric });
  } catch (err) {
    next(err);
  }
};
