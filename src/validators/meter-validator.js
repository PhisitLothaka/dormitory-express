const Joi = require("joi");

const checkArrayMeterSchema = Joi.object({
  priceUnit: Joi.number().positive().required(),
  unit: Joi.number().required(),
  createAt: Joi.date().required(),
  roomId: Joi.number().integer().positive().required(),
  adminId: Joi.number().integer().positive().required(),
  unitUsed: Joi.number().positive(),
});

exports.checkArrayMeterSchema = checkArrayMeterSchema;
