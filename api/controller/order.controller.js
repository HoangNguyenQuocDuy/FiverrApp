import Gig from "../models/gig.model";
import Order from "../models/order.model";
import createError from "../utils/createError";

export const getOrder = async(req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true
    });

    if (!orders) return next(createError(404, 'Not found!!!'))

    return res.status(200).send(orders)
  } catch (err) {
    return next(err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    const newOrder = new Order({
      gigId: req.params.id,
      img: gig.images[0],
      title: gig.shortTitle,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.userId,
      payment_intent: "temporary",
    });

    await newOrder.save();

    return res.status(200).send(newOrder);
  } catch (err) {
    return next(err);
  }
};
