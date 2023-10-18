const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const meterController = require("../controllers/meter-controller");
const router = express.Router();

router.get(
  "/water/:date",
  authenticateMiddleware,
  meterController.getMeterWater
);
router.post("/water", authenticateMiddleware, meterController.createMeterWater);

router.post(
  "/electric",
  authenticateMiddleware,
  meterController.createMeterElectric
);

module.exports = router;
