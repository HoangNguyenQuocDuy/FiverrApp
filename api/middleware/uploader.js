const cloudinary = require("cloudinary").v2;
const multer = require("multer");
import dotenv from "dotenv";

dotenv.config();

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Config store Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadCloud = multer({ storage: storage });
module.exports = uploadCloud
