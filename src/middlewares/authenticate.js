const prisma = require("../model/prisma");
const jwt = require("jsonwebtoken");
const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(createError("unauthenticated", 401));
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "jdfasuf923kjdf9qkjsd09uqkwjsl;kxcjgh"
    );

    const user = await prisma.admin.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      return next(createError("unauthenticated", 401));
    }
    delete user.password;
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpireError" || err.name === "JsonWebTokenError") {
      err.statusCode = 401;
    }
    next(err);
  }
};
