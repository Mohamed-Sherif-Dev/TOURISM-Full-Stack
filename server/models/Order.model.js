const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  title: String,
  price: Number,
  quantity: Number,
  image: String,
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  subTotal: Number,
  discount: { type: Number, default: 0 },
  grandTotal: Number,
  status: {
    type: String,
    enum: ["Pending", "Paid", "Cancelled"],
    default: "Pending",
  },
  address: String,   
  paymentMethod: { type: String, default: "COD" }, 
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);