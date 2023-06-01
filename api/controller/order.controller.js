import Gig from "../models/gig.model";
import Order from "../models/order.model";
import createError from "../utils/createError";
import Stripe from "stripe";

export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    if (!orders) return next(createError(404, "Not found!!!"));

    return res.status(200).send(orders);
  } catch (err) {
    return next(err);
  }
};

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.SECRET_KY);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: req.params.id,
    img: gig.images[0],
    title: gig.shortTitle,
    price: gig.price,
    sellerId: gig.userId,
    buyerId: req.userId,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  return res.status(200).send({
    clientSecret: paymentIntent.client_secret
  });
};

export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate({ payment_intent: req.body.payment_intent }, {
      $set: {
        isCompleted: true
      }
    })

    return res.status(200).send('Order has been confirmed!')
  } catch(err) {return next(err)}
}

// export const createOrder = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);

//     return res.status(200).send(newOrder);
//   } catch (err) {
//     return next(err);
//   }
// };
