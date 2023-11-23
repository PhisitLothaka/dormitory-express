const { STATUS_PAID, STATUS_UNPAID } = require("../config/constants");
const prisma = require("../model/prisma");
const createError = require("../utils/create-error");

exports.getSummarize = async (req, res, next) => {
  const { date } = req.params;
  try {
    const roomUsers = await prisma.userRoom.findMany({
      where: { adminId: req.user.id },
      include: {
        user: true,

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
            MeterWater: {
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

    const summarize = roomUsers.map((room) => ({
      roomName: room?.room?.name,
      userName: room?.user?.firstName + " " + room?.user?.lastName,
      statusPayment: room?.statusPayment,
      priceRoom: room?.room?.price,
      unitWater: room?.room?.MeterWater[0]?.unitUsed,
      priceUnitWater:
        room?.room?.MeterWater[0].priceUnit *
        room?.room?.MeterWater[0]?.unitUsed,
      unitElectric: room?.room?.MeterElectric[0]?.unitUsed,
      priceUnitElectric:
        room?.room?.MeterElectric[0].priceUnit *
        room?.room?.MeterElectric[0]?.unitUsed,
      totalPrice:
        room?.room?.price +
        room?.room?.MeterWater[0].priceUnit *
          room?.room?.MeterWater[0]?.unitUsed +
        room?.room?.MeterElectric[0].priceUnit *
          room?.room?.MeterElectric[0]?.unitUsed,
      userId: room?.user?.id,
      roomId: room?.room?.id,
    }));

    res.status(200).json(summarize);
  } catch (err) {
    next(err);
  }
};

exports.createSummarize = async (req, res, next) => {
  try {
    const { data } = req.body;
    const result = data.map((el) => {
      delete el.roomName;
      delete el.userName;
      delete el.statusPayment;

      return { ...el, adminId: req.user.id };
    });
    const summarizeObj = await prisma.Sumarize.createMany({
      data: result,
    });

    res.status(201).json({ summarizeObj });
  } catch (err) {
    console.log(
      "🚀 ~ file: summarize-controller.js:31 ~ exports.createSummarize= ~ err:",
      err
    );
    next(err);
  }
};

exports.getMonthOnSummarize = async (req, res, next) => {
  try {
    // console.log("test");
    const order = await prisma.sumarize.findMany({
      select: { timeReceipt: true },
      distinct: ["timeReceipt"],
    });

    res.status(200).json(order);
  } catch (err) {
    console.log(err);
  }
};

exports.getSummarizeInMonth = async (req, res, next) => {
  try {
    const { month } = req.params;

    const getMonthDates = (month) => {
      if (month < 1 || month > 12) {
        return next(createError("Invalid month", 400));
      }

      const currentYear = new Date().getFullYear();

      const startDate = new Date(`${currentYear}-${month}-01T00:00:00`);

      const endDate = new Date(currentYear, month, 0, 23, 59, 59, 999);

      const formattedStartDate =
        startDate.toISOString().split("T")[0] + " 0:0:0";
      const formattedEndDate = endDate.toISOString().split("T")[0] + " 0:0:0";

      return {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
    };
    const { startDate, endDate } = getMonthDates(month);

    const result = await prisma.sumarize.findMany({
      where: {
        timeReceipt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        room: true,
        user: true,
      },
    });

    const sumarizeInMonth = result.map((el) => {
      return {
        id: el?.id,
        roomName: el?.room?.name,
        userName: el?.user?.firstName + " " + el?.user?.lastName,
        priceRoom: el?.priceRoom,
        priceWater: el?.priceUnitWater,
        priceElectric: el?.priceUnitElectric,
        totalPrice: el?.totalPrice,
        checkPayment: el?.checkPayment,
      };
    });

    res.status(200).json({ sumarizeInMonth });
  } catch (err) {
    console.log(err);
  }
};

exports.editStatusPayment = async (req, res, next) => {
  try {
    const { checkPayment, id } = req.body;
    const result = await prisma.sumarize.update({
      data: {
        checkPayment: checkPayment,
      },
      where: { id: id },
    });
    const { roomId } = result;
    const findRoom = await prisma.room.findFirst({
      where: { id: roomId },
      include: {
        userRoom: true,
      },
    });
    console.log(
      "🚀 ~ file: summarize-controller.js:187 ~ exports.editStatusPayment= ~ findRoom:",
      findRoom
    );
    if (checkPayment) {
      const result = await prisma.userRoom.update({
        data: { statusPayment: STATUS_PAID },
        where: { id: findRoom?.userRoom[0]?.id },
      });
    } else {
      const result = await prisma.userRoom.update({
        data: { statusPayment: STATUS_UNPAID },
        where: { id: findRoom?.userRoom[0]?.id },
      });
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
