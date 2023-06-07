import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";
const cloudinary = require("cloudinary").v2;

export const handleUploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.send("");
    }
    const public_id = `fiverr/${req.file.filename}`;
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id,
    });

    return res.status(200).send(result.url);
  } catch (err) {
    console.log(err);
    res.status(404).send("file not found!");
  }
};

export const uploadMultiFiles = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.send("don't work!");
    }
    const images = await Promise.all([...req.files].map(async (file) => {
      const public_id = `fiverr/${file.filename}`;
      const result = await cloudinary.uploader.upload(file.path, { public_id });

      return result.url
    }))

    return res.status(200).send(images);
  } catch (err) {
    console.log(err);
    res.status(404).send("file not found!");
  }
};

export const register = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 5);
    console.log(req.body);
    const newUser = new User({
      ...req.body,
      password,
    });
    await newUser.save();
    res.status(200).send("User register successful!");
  } catch (err) {
    return err;
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword)
      return next(createError(400, "User password incorrect!"));
    const { _id, isSeller } = user._doc;
    const { password, ...info } = user._doc;

    const token = jwt.sign({ _id, isSeller }, process.env.JWT_KEY);

    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (err) {
    return next(err);
  }
};

//we'll add 'BLACKLIST array' store logged tokens or use redis in the feature.
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
