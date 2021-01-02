const express = require("express");
const { isAuth, isAdmin, isSellerOrAdmin } = require("../utils/check-auth");

const orderController = require("../controllers/orders");

const router = express.Router();

router.get("/", isAuth, isSellerOrAdmin, orderController.getAllOrders);
router.get("/orderhistory", isAuth, orderController.orderHistory);
router.post("/", isAuth, orderController.createOrder);
router.get("/:id", isAuth, orderController.orderDetail);
router.put("/:id/payment", isAuth, orderController.orderPayment);
router.delete("/:id", isAuth, isAdmin, orderController.deleteOrder);
router.put("/:id/deliver", isAuth, isAdmin, orderController.orderDeliver);

module.exports = router;
