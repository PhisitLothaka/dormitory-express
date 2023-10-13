const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const roomController = require("../controllers/room-controller");

const router = express.Router();

router.post("/", authenticateMiddleware, roomController.createRoom);
router.patch("/", authenticateMiddleware, roomController.editRoom);
router.delete("/:roomId", authenticateMiddleware, roomController.deleteRoom);

module.exports = router;
