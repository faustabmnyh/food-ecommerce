const express = require("express");

const router = express.Router();
const userController = require("../controllers/users");

router.post("/signin", userController.userSignin);
router.post("/register", userController.userRegister);

module.exports = router;
