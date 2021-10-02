const express = require("express");
const {
  getUsers,
  signin,
  register,
  getUserById,
} = require("../controller/userController");

const router = express.Router();

router.get("/seed", getUsers);
router.post("/signin", signin);
router.post("/register", register);
router.get("/:id", getUserById);

module.exports = router;
