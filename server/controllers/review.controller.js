const Review = require("../models/Review.model");

// GET /api/tours/:tourId/reviews
exports.getReviewsForTour = async (req, res) => {
  try {
    const reviews = await Review.find({ tour: req.params.tourId });
    res.json({ success: true, reviews });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const data = {
      review: req.body.review,
      rating: req.body.rating,
      tour: req.params.tourId,
      user: req.user._id,
    };
    const r = await Review.create(data);
    res.status(201).json({ success: true, review: r });
  } catch (e) {
    const msg = e.code === 11000 ? "You already reviewed this tour" : e.message;
    res.status(400).json({ success: false, message: msg });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { review: req.body.review, rating: req.body.rating },
      { new: true, runValidators: true }
    );
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, review });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Review deleted" });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};