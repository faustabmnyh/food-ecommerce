const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

const productDetails = expressAsyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  res.send(products);
});

module.exports = { productDetails, getProducts };
