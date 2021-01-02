const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = expressAsyncHandler(async (req, res) => {
  const seller = req.query.seller;
  const sellerFilter = seller ? { seller } : {};
  const products = await Product.find({ ...sellerFilter })
    .populate("seller", "seller.name seller.logo")
    .limit(6);
  res.send(products);
});

const getAllProducts = expressAsyncHandler(async (req, res) => {
  const name = req.query.name;
  const seller = req.query.seller;
  const category = req.query.category;
  const order = req.query.order;
  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const rating =
    req.query.rating && Number(req.query.rating) !== 0
      ? Number(req.query.rating)
      : 0;
  const sellerFilter = seller ? { seller } : {};
  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const categoryFilter = category ? { category } : {};
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
  const ratingFilter = rating ? { rating: { $gte: rating } } : {};
  const sortOrder =
    order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : { _id: -1 };
  const products = await Product.find({
    ...sellerFilter,
    ...nameFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .populate("seller", "seller.name seller.logo")
    .sort(sortOrder);
  res.send(products);
});

const productDetails = expressAsyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id).populate(
    "seller",
    "seller.name seller.logo seller.rating seller.num_reviews"
  );
  res.send(products);
});

const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
});

const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    seller: req.user._id,
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

const createReview = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    if (product.reviews.find((review) => review.username === req.user.username))
      return res
        .status(400)
        .send({ message: "You already submitted a review" });
    const review = {
      username: req.user.username,
      photo_profile: req.body.photo_profile,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.num_reviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      message: "Review Created",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
    });
    console.log(
      "review",
      updatedProduct.reviews[updatedProduct.reviews.length - 1]
    );
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
  getCategories,
  createReview,
};
