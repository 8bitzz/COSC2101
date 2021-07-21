const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: String,
  publishYear: String,
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  trailerURL: String,
  images: [String],
  casts: String
});

module.exports = mongoose.model("Movie", roomSchema);
