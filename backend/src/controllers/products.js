const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({}).limit(6);
  res.send(products);
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

const productDetails = expressAsyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);
  res.send(products);
});

const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    stock_products: req.body.countInStock,
    rating: 0,
    num_reviews: 0,
    description: req.body.description,
  });
  const createdProduct = await product.save();
  res.send({ message: "Success created product", product: createdProduct });
});

const updateProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.category = req.body.category;
    product.stock_products = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    res.send({ message: "Product Updated", product: updatedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const deletedProduct = await product.deleteOne();
    res.send({ message: "Product Deleted", product: deletedProduct });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

module.exports = {
  productDetails,
  getProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
