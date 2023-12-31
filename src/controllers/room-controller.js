const {
  STATUS_IDLE,
  STATUS_PAID,
  STATUS_BUSY,
} = require("../config/constants");
const error = require("../middlewares/error");
const prisma = require("../model/prisma");
const { checkRoomSchema } = require("../validators/room-validator");

//get จากตาราง userRoom
exports.getRoom = async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        adminId: req.user.id,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        userRoom: {
          include: {
            user: true,
          },
        },
      },
    });

    res.status(200).json({ rooms });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { idCardUser, idRoom } = req.body;
    const findUser = await prisma.user.findUnique({
      where: { idCard: idCardUser },
    });
    const findRoom = await prisma.room.findUnique({
      where: { id: idRoom },
    });
    const userRoom = await prisma.userRoom.create({
      data: {
        statusPayment: STATUS_PAID,
        roomId: findRoom.id,
        userId: findUser.id,
        adminId: req.user.id,
      },
    });

    if (userRoom.userId) {
      await prisma.room.update({
        data: {
          statusRoom: STATUS_BUSY,
        },
        where: { id: userRoom.roomId },
      });
    }

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(
      "🚀 ~ file: room-controller.js:60 ~ exports.addUser= ~ err:",
      err
    );
    next(err);
  }
};

exports.deleteUserRoom = async (req, res, next) => {
  try {
    const { userRoomId } = req.params;
    console.log(
      "🚀 ~ file: room-controller.js:64 ~ exports.deleteUserRoom ~ userRoomId:",
      userRoomId
    );
    await prisma.userRoom.delete({
      where: {
        id: +userRoomId,
      },
    });
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(
      "🚀 ~ file: room-controller.js:71 ~ exports.deleteUserRoom ~ err:",
      err
    );
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { value, error } = checkRoomSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const createRoom = await prisma.room.create({
      data: {
        name: value.name,
        price: value.price,
        floor: value.floor,
        statusRoom: STATUS_IDLE,
        adminId: req.user.id,
      },
    });
    res.status(201).json({ message: "Room created", createRoom });
  } catch (err) {
    next(err);
  }
};

exports.editRoom = async (req, res, next) => {
  try {
    const { value, error } = checkRoomSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const roomEdit = await prisma.room.update({
      data: {
        name: value.name,
        price: value.price,
        floor: value.floor,
      },
      where: {
        id: value.id,
        adminId: req.user.id,
      },
    });
    res.status(201).json({ message: "Room update", roomEdit });
  } catch (err) {
    console.log(
      "🚀 ~ file: room-controller.js:62 ~ exports.editRoom= ~ err:",
      err
    );
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const result = await prisma.room.delete({
      where: {
        id: +roomId,
      },
    });

    res.status(200).json({ message: "delete" });
  } catch (err) {
    next(err);
  }
};
