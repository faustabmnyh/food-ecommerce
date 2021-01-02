const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
    photo_profile: { type: String },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    num_reviews: { type: Number, required: true },
    stock_products: { type: Number, required: true },
    description: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
