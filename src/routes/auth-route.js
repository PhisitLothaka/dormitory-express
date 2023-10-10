const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

router.post("/register", authController.registerAdmin);
// router.post("/login");

module.exports = router;
