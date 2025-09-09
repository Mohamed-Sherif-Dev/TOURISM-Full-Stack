const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    title: String,              
    price: { type: Number, required: true }, 
    quantity: { type: Number, default: 1, min: 1 },
    image: String,           
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: { type: [cartItemSchema], default: [] },
    subTotal: { type: Number, default: 0 },   
    discount: { type: Number, default: 0 },   
    grandTotal: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

cartSchema.methods.recalc = function () {
  this.subTotal = this.items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  if (this.discount < 0) this.discount = 0;
  if (this.discount > this.subTotal) this.discount = this.subTotal;
  this.grandTotal = this.subTotal - this.discount;
};

module.exports = mongoose.model("Cart", cartSchema);