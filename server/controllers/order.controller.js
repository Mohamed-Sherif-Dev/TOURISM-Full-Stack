const Cart = require("../models/Cart.model");
const Order = require("../models/Order.model");

exports.checkout = async (req, res) => {
  const userId = req.userId;
  const { address, paymentMethod = "COD" } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const order = await Order.create({
    user: userId,
    items: cart.items,
    subTotal: cart.subTotal,
    discount: cart.discount,
    grandTotal: cart.grandTotal,
    address,
    paymentMethod,
  });

  // فضّي الكارت
  cart.items = [];
  cart.recalc();
  await cart.save();

  res.status(201).json({ success: true, order });
};

exports.getMyOrders = async (req, res) => {
  const userId = req.userId;
  const orders = await Order.find({ user: userId }).sort("-createdAt");
  res.json({ success: true, orders });
};