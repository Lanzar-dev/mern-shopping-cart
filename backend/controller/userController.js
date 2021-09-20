const userData = require("../data/user");
const User = require("../models/User");
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

// module.exports = {
//   getUsers,
//   signin,
// };
