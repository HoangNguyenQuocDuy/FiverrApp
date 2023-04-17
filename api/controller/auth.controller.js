import User from "../models/user.model";
import bcrypt from "bcrypt";

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
    res.status(500).send("some thing is wrong!");
  }
};

export const login = async (req, res) => {
  try {
    await User.findOne({ username: req.body.username })
    .then(data => {
      const user = data._doc;
      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isCorrect) return res.status(400).send("User password incorrect");
      const { password, ...info } = user;
      res.status(200).send(info);
    })
    .catch(() => {
      res.status(404).send("User not exit!");
    });
  } catch(err) {
    res.status(500).send("Something is wrong!")
  }
};

export const logout = async (req, res) => {};
