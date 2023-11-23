const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authenticate");
const userController = require("../controllers/use-controller");

router.get("/", authenticateMiddleware, userController.getRoom);

module.exports = router;
