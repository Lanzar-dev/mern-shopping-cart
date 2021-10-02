const express = require("express");
const {
  getUsers,
  signin,
  register,
  getUserById,
  userProfileUpdate,
} = require("../controller/userController");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/seed", getUsers);
router.post("/signin", signin);
router.post("/register", register);
router.get("/:id", getUserById);
router.put("/profile", isAuth, userProfileUpdate);

module.exports = router;
