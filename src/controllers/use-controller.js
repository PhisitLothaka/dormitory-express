const prisma = require("../model/prisma");

exports.getRoom = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const result = await prisma.sumarize.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        room: { select: { name: true } },
      },
    });

    result;

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
  }
};
