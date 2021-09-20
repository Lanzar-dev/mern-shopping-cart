const userData = require("../data/user");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

const getUsers = expressAsyncHandler(async (req, res) => {
  // await User.deleteMany({});

  const createdUsers = await User.insertMany(userData);
  res.send({ createdUsers });
});

module.exports = getUsers;
