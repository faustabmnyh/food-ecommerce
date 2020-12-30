const express = require("express");

const router = express.Router();
const userController = require("../controllers/users");
const { isAuth, isAdmin } = require("../utils/check-auth");

router.get("/", isAuth, isAdmin, userController.getAllUser);
router.post("/signin", userController.userSignin);
router.post("/register", userController.userRegister);
router.put("/profile", isAuth, userController.updateUser);
router.get("/:id", isAuth, userController.getUser);

module.exports = router;
