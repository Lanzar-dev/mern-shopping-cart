const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Yekeen",
    email: "tylanzar@gmail.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: true,
  },
  {
    name: "Eniola",
    email: "user@gmail.com",
    password: bcrypt.hashSync("12345", 8),
    isAdmin: false,
  },
];

module.exports = users;
