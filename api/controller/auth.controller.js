import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError";

export const register = async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password,
    });

    await newUser.save();
    res.status(200).send("User register successful!");
  } catch (err) {
    return next(err)
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if(!user) return next(createError(404, "User not found!"));

    const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password)
    if (!isCorrectPassword) return next(createError(400, "User password incorrect!"));
    const { _id, isSeller } = user._doc
    const { password, ...info } = user._doc

    const token = jwt.sign({ _id, isSeller }, process.env.JWT_KEY)
    
    res.cookie("accessToken", token, { httpOnly: true}).status(200).send(info)
  } catch(err) {
    // res.status(500).send("Something is wrong!")
    return next(err)
  }
};


//we'll add 'BLACKLIST array' store logged tokens or use redis in the feature.   
export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
    sameSite: "none",
    secure: true,
  }).status(200).send("User has been logged out.")
};
