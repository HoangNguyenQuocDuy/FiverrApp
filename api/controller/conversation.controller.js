import Conversation from "../models/conversation.model";
import createError from "../utils/createError";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.isSeller ? req.body.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const saveConversation = await newConversation.save();

    return res.status(201).send(saveConversation);
  } catch (err) {
    return next(err);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });

    if (!conversation) return next(createError(404, 'Not found!!!'))
    
    return res.status(200).send(conversation);
  } catch (err) {
    return next(err);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updateAt: -1 });

    if (!conversations) return next(createError(404, "Not found!!!"));

    return res.status(200).send(conversations);
  } catch (err) {
    return next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { id: req.params.id},
      { 
        $set: { 
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true})
        }
      },
      { returnNewDocument: true }
    )

    if (!conversation) return next(createError(404, "Not found!!!"));

    return res.status(200).send(conversation)
  } catch (err) {
    return next(err);
  }
};
