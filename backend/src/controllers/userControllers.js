const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const registerUser = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password ) {
    return res.status(401).json("Missing email or password field");
  }
  // Validate email and password
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check if there is any account registered with the email address
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(401).json("Email has been registered");
  }

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

const loginUser = catchAsync(async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password ) {
      return res.status(401).json("Missing email or password field");
    }
    // Check if there is any account registered with the email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Can not find any user with that email address");
    }

    // Check if password matched
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
       return res.status(401).json("Incorrect password");
    } 
    // Generate JWT accessToken
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    // Extract password from response
    const { password, ...userInfo } = user._doc;

    // Return accessToken in response
    res.status(200).json({ ...userInfo, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  registerUser,
  loginUser,
};
