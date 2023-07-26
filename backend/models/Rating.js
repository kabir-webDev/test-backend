const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
