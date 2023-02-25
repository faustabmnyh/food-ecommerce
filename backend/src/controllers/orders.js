const expressAsyncHandler = require("express-async-handler");
const Order = require("../models/Order");

const getAllOrders = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 10;
  const seller = req.query.seller || "";
  const sellerFilter = seller ? { seller } : {};
  const count = await Order.countDocuments({ ...sellerFilter });
  const orders = await Order.find({ ...sellerFilter })
    .populate("user", "username photo_profile")
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ orders, page, pages: Math.ceil(count / pageSize) });
});

const orderDetail = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.send({ message: "Order Not Found" });
  }
});

const createOrder = expressAsyncHandler(async (req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({ message: "Cart is empty" });
  } else {
    console.log("orderItems", req.body.orderItems);
    const order = new Order({
      orderItems: req.body.orderItems,
      seller: req.body.orderItems[0].seller,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).send({ message: "New Order Created", order: createdOrder });
  }
});

const orderHistory = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  console.log(req.user);
  res.send(orders);
});

const orderPayment = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(Date.now());
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time || Date.now(),
      email_address:
        req.body.email_address ||
        req.body?.charges?.data[0].billing_details.email,
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const orderDeliver = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({ message: "Order Delivered", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

const deleteOrder = expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    const deletedOrder = await order.remove();
    res.send({ message: "Order Deleted", order: deletedOrder });
  } else {
    res.status(404).send({ message: "Order Not Found" });
  }
});

module.exports = {
  createOrder,
  orderDetail,
  orderHistory,
  orderPayment,
  getAllOrders,
  deleteOrder,
  orderDeliver,
};
