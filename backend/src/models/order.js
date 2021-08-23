var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    movies: {
      type: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
    },
  }
);

module.exports = mongoose.model("Order", OrderSchema);