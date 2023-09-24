const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

module.exports = router;