const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({email});
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user =await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    "d5ebd14aa1437c48a6b7bd2b9be9b1f1"
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

module.exports = {
    registerUser
}