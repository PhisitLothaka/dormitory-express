const prisma = require("../model/prisma");
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
            },
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
    const { date } = req.params;
    console.log(
      "🚀 ~ file: meter-controller.js:38 ~ exports.getMeterByDate= ~ date:",
      date
    );
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
                createAt: {
                  lte: new Date(date),
                },
              },
              take: 1,
            },
          },
        },
      },
    });

    res.status(200).json({ roomAdmin });
  } catch (err) {
    next(err);
  }
};

exports.createMeterWater = async (req, res, next) => {
  try {
    const { value, error } = checkArrayMeterSchema.validate(req.body);

    if (error) {
      next(error);
    }

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
    const { value, error } = checkArrayMeterSchema.validate(req.body);

    if (error) {
      next(error);
    }
    const createMeterElectric = await prisma.meterElectric.createMany({
      data: value,
    });
    res.status(201).json({ createMeterElectric });
  } catch (err) {
    next(err);
  }
};
