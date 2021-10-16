const multer = require("multer");
const express = require("express");
const { isAuth } = require("../middleware/auth");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

uploadRouter.post("/", isAuth, upload.single("imageUrl"), (req, res) => {
  // console.log(req.file);
  res.send(`/${req.file.path}`);
});

module.exports = uploadRouter;
