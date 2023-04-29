import Gig from "../models/gig.model";
import createError from "../utils/createError";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "Only seller can create gig!"));
  const newGig = new Gig({ userId: req.userId, ...req.body });
  try {
    const saveGig = await newGig.save();
    return res.status(201).json(saveGig);
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found!"));

    return res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gigs!"));

    await Gig.findOneAndDelete(req.params.id);
    res.status(200).send("Gig has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.cat && { cat: q.cat }),
    ...((q.max || q.min) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const gigs = await Gig.find(filters);
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};
