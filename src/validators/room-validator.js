const Joi = require("joi");

const checkRoomSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  floor: Joi.number().integer().positive().required(),
});

exports.checkRoomSchema = checkRoomSchema;
