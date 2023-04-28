import Gig from "../models/gig.model";
import createError from "../utils/createError";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only seller can create gig!"));
  const newGig = new Gig({ userId: req.body.userId, ...req.body });
  try {
    const saveGig = await newGig.save()
    return res.status(201).json(saveGig)
  } catch (err) {
    next(err);
  }
};

export const getGig = (req, res) => {
  res.send("from controller");
};

export const deleteGig = (req, res) => {
  res.send("from controller");
};

export const getGigs = (req, res) => {
  res.send("from controller");
};
