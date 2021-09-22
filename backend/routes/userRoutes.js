const express = require("express");
const { getUsers, signin, register } = require("../controller/userController");

const router = express.Router();

router.get("/seed", getUsers);
router.post("/signin", signin);
router.post("/register", register);

module.exports = router;
