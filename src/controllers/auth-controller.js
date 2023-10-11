const { registerSchema, loginSchema } = require("../validators/auth-validator");
const createError = require("../utils/create-error");
const prisma = require("../model/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.admin.create({
      data: value,
    });

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "34435DFJ98IOSDJHV8A7GHB",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.user.create({
      data: value,
    });

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "34435DFJ98IOSDJHV8A7GHB",
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }
    const user = await prisma.user.findFirst({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      return next(createError("invalid credential", 400));
    }
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "12jkdsfasiodfslkd2i3",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    console.log(
      "🚀 ~ file: auth-controller.js:97 ~ exports.loginAdmin= ~ value:",
      value
    );

    if (error) {
      return next(error);
    }
    const user = await prisma.admin.findFirst({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      return next(createError("invalid credential", 400));
    }
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }

    const payload = { userId: user.id };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "12jkdsfasiodfslkd2i3",
      { expiresIn: process.env.JWT_EXPIRE }
    );
    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (err) {
    next(err);
  }
};
