const express = require("express");
const authenticateMiddleware = require("../middlewares/authenticate");
const meterController = require("../controllers/meter-controller");
const router = express.Router();

router.get("/water", authenticateMiddleware, meterController.getMeterWater);
router.get(
  "/water/:date",
  authenticateMiddleware,
  meterController.getMeterByDate
);
router.post("/water", authenticateMiddleware, meterController.createMeterWater);

router.post(
  "/electric",
  authenticateMiddleware,
  meterController.createMeterElectric
);

module.exports = router;
