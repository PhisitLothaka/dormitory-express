const express = require("express");
const authController = require("../controllers/auth-controller");
const router = express.Router();

router.post("/register/owner", authController.registerAdmin);
router.post("/register/user", authController.registerUser);
router.post("/login/user", authController.loginUser);
router.post("/login/owner", authController.loginAdmin);

module.exports = router;
