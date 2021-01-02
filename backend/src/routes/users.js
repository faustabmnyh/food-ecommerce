const express = require("express");

const router = express.Router();
const userController = require("../controllers/users");
const { isAuth, isAdmin } = require("../utils/check-auth");

router.get("/", isAuth, isAdmin, userController.getAllUser);
router.post("/signin", userController.userSignin);
router.post("/register", userController.userRegister);
router.put("/profile", isAuth, userController.updateUserProfile);
router.get("/:id", isAuth, userController.getUser);
router.delete("/:id", isAuth, isAdmin, userController.deleteUser);
router.put("/:id", isAuth, isAdmin, userController.updateUser);

module.exports = router;
