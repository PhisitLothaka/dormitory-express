const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const roomController = require("../controllers/room-controller");

const router = express.Router();

router.get("/", authenticateMiddleware, roomController.getRoom);
router.post("/", authenticateMiddleware, roomController.createRoom);
router.post("/user", authenticateMiddleware, roomController.addUser);
router.delete(
  "/user/:userRoomId",
  authenticateMiddleware,
  roomController.deleteUserRoom
);
router.patch("/", authenticateMiddleware, roomController.editRoom);
router.delete("/:roomId", authenticateMiddleware, roomController.deleteRoom);

module.exports = router;
