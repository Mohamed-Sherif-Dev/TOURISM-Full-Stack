const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
