const Cart = require("../models/Cart.model");
const Tour = require("../models/Tour.model");

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

// GET /api/cart
exports.getMyCart = async (req, res) => {
  const cart = await getOrCreateCart(req.userId);
  res.json({ success: true, cart });
};

// POST /api/cart/add  { "tourId": "...", "quantity": 1 }
exports.addToCart = async (req, res) => {
  const { tourId, quantity = 1 } = req.body;
  if (!tourId) return res.status(400).json({ success: false, message: "tourId is required" });

  const tour = await Tour.findById(tourId).select("name price imageCover");
  if (!tour) return res.status(404).json({ success: false, message: "Tour not found" });

  const cart = await getOrCreateCart(req.user);

  const idx = cart.items.findIndex((it) => String(it.tour) === String(tourId));
  if (idx > -1) {
    cart.items[idx].quantity += Number(quantity);
  } else {
    cart.items.push({
      tour: tour._id,
      title: tour.name,
      price: tour.price,
      quantity: Number(quantity),
      image: tour.imageCover,
    });
  }

  cart.recalc();
  await cart.save();

  res.status(201).json({ success: true, cart });
};

// PATCH /api/cart/item  { "tourId": "...", "quantity": 2 }
exports.updateItemQty = async (req, res) => {
  const { tourId, quantity } = req.body;
  if (!tourId || !Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ success: false, message: "tourId and valid quantity are required" });
  }

  const cart = await getOrCreateCart(req.user);
  const item = cart.items.find((it) => String(it.tour) === String(tourId));
  if (!item) return res.status(404).json({ success: false, message: "Item not in cart" });

  item.quantity = quantity;
  cart.recalc();
  await cart.save();

  res.json({ success: true, cart });
};

// DELETE /api/cart/item/:tourId
exports.removeItem = async (req, res) => {
  const { tourId } = req.params;
  const cart = await getOrCreateCart(req.user);

  const before = cart.items.length;
  cart.items = cart.items.filter((it) => String(it.tour) !== String(tourId));

  if (cart.items.length === before) {
    return res.status(404).json({ success: false, message: "Item not in cart" });
  }

  cart.recalc();
  await cart.save();

  res.json({ success: true, cart });
};

// DELETE /api/cart/clear
exports.clearCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user);
  cart.items = [];
  cart.recalc();
  await cart.save();
  res.json({ success: true, cart });
};

// (اختياري) PATCH /api/cart/discount  { "amount": 50 }
exports.applyDiscount = async (req, res) => {
  const { amount = 0 } = req.body;
  const cart = await getOrCreateCart(req.user);
  cart.discount = Number(amount) < 0 ? 0 : Number(amount);
  cart.recalc();
  await cart.save();
  res.json({ success: true, cart });
};