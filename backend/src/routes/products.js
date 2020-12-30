const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");
const { isAdmin, isAuth } = require("../utils/check-auth");

router.get("/", productController.getProducts);
router.post("/", isAuth, isAdmin, productController.createProduct);
router.get("/shop", productController.getAllProducts);
router.get("/:id", productController.productDetails);
router.put("/:id", isAuth, isAdmin, productController.updateProduct);
router.delete("/:id", isAuth, isAdmin, productController.deleteProduct);

module.exports = router;
