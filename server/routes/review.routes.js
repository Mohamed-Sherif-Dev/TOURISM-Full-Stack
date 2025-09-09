const express = require("express");
const router = express.Router({ mergeParams: true }); // علشان tourId من الراوت الأب
const auth = require("../middleware/auth");

const {
  getReviewsForTour,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router.get("/", getReviewsForTour);
router.post("/", auth, createReview);

router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

module.exports = router;