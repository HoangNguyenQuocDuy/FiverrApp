import User from "../models/user.model";
import createError from "../utils/createError";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString())
    return next(createError(403, "You can delete only your account!"))
  await User.deleteOne(user);
  res.status(200).send("deleted.");
};

export const getUser = async (req, res, next) => {
  const user =  await User.findById(req.params.id);

  if (!user) return next(createError(404, "User not found!"))
  return res.status(200).send(user)
}
