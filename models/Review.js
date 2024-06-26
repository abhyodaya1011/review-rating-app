const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  productId: String,
  date: { type: Date, default: Date.now },
  rating: Number,
  title: String,
  reviewText: String,
  size: String,
  styleName: String,
  color: String,
  metalType: String,
  gemstone: String,
  images: [String],
  approved: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false },
  helpfulCount: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
