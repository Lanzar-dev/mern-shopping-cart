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
  const { name, email, password } = await req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exist" });
    }

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
  }
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};

exports.userProfileUpdate = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.send(users);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.emai === "tylanzar@gmail.com") {
      res.status(400).send({ message: "Can Not Delete Admin User" });
    }

    const deletedUser = await user.remove();

    res.send({ message: "User Deleted", user: deletedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};

exports.updateRegisteredUsers = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    // req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;

    const updatedUser = await user.save();

    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
};
