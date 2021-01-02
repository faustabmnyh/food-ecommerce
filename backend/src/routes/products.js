const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { isAdmin, isAuth, isSellerOrAdmin } = require("../utils/check-auth");

router.get("/", productController.getProducts);
router.post("/", isAuth, isSellerOrAdmin, productController.createProduct);
router.get("/shop", productController.getAllProducts);
router.get("/categories", productController.getCategories);
router.get("/:id", productController.productDetails);
router.put("/:id", isAuth, isSellerOrAdmin, productController.updateProduct);
router.delete("/:id", isAuth, isAdmin, productController.deleteProduct);
router.post("/:id/reviews", isAuth, productController.createReview);

module.exports = router;
