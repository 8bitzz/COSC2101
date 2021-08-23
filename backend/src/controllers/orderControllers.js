const Order = require("../models/order");
const catchAsync = require("../util/catchAsync");

// Async function to get all cart items from a logged user
exports.getAllOrders = catchAsync(async (req, res, next) => {
  // Get all cart by this user
  // const orders = await Order.find({ createdBy: req.user.id }).populate("movie");

  // // Return data
  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     orders,
  //   },
  // });
});

// Async function to create a new cart item
exports.createNewOrder = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Hello"
  });
});