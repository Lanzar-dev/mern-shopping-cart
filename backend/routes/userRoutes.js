const express = require("express");
const { getUsers, signin } = require("../controller/userController");

const router = express.Router();

router.get("/seed", getUsers);
router.post("/signin", signin);

module.exports = router;
