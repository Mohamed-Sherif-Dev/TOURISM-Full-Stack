const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getMyCart,
  addToCart,
  updateItemQty,
  removeItem,
  clearCart,
  applyDiscount,
} = require("../controllers/cart.controller");

router.use(auth); // كل راوت محمي

router.get("/", getMyCart);
router.post("/add", addToCart);
router.patch("/item", updateItemQty);
router.delete("/item/:tourId", removeItem);
router.delete("/clear", clearCart);
router.patch("/discount", applyDiscount); // اختياري

module.exports = router;