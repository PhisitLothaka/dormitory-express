const prisma = require("../model/prisma");

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
    console.log(
      "🚀 ~ file: summarize-controller.js:43 ~ summarize ~ summarize:",
      summarize
    );

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
    console.log(
      "🚀 ~ file: summarize-controller.js:84 ~ exports.createSummarize= ~ summarizeObj:",
      summarizeObj
    );

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

exports.editStatusPayment = (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
