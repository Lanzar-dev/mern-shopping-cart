const userData = require("../data/user");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

exports.getUsers = expressAsyncHandler(async (req, res) => {
  // await User.deleteMany({});

  const createdUsers = await User.insertMany(userData);
  res.send({ createdUsers });
});

exports.signin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
};

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  } catch (error) {
    next(error);
    // res.status(401).send({ message: "Email already exist" });
  }
};
