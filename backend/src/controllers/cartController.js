const Cart = require("../models/cart");
const catchAsync = require("../util/catchAsync");

// Async function to get all cart from a logged user
exports.getAllCart = catchAsync(async (req, res, next) => {
  // Get all cart by this user
  const carts = await Cart.find({ createdBy: req.user.id })
    .populate("movie")
    .populate("createdBy");

  // Return data
  res.status(200).json({
    status: "success",
    data: {
      carts,
    },
  });
});
