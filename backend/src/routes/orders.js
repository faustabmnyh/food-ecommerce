const express = require("express");
const { isAuth } = require("../utils/check-auth");

const orderController = require("../controllers/orders");

const router = express.Router();

router.get("/orderhistory", isAuth, orderController.orderHistory);
router.post("/", isAuth, orderController.createOrder);
router.get("/:id", isAuth, orderController.orderDetail);
router.put("/:id/payment", isAuth, orderController.orderPayment);

module.exports = router;
