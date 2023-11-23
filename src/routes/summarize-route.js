const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authenticate");
const summarizeController = require("../controllers/summarize-controller");

router.get(
  "/order",
  authenticateMiddleware,
  summarizeController.getMonthOnSummarize
);
router.get(
  "/order/:month",
  authenticateMiddleware,
  summarizeController.getSummarizeInMonth
);
router.patch(
  "/order",
  authenticateMiddleware,
  summarizeController.editStatusPayment
);

router.get("/:date", authenticateMiddleware, summarizeController.getSummarize);
router.post("/", authenticateMiddleware, summarizeController.createSummarize);

module.exports = router;
