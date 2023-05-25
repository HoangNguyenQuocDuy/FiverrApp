import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import createError from "../utils/createError";

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });

    if (!messages) return next(createError(404, "Not found!!!"));

    return res.status(200).send(messages);
  } catch (err) {
    return next(err);
  }
};

export const createMessage = async (req, res, next) => {
  const message = new Message({
    conversationId: req.body.id,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const saveMessage = await message.save();

    await Conversation.findOneAndUpdate(
      { id: req.body.id },
      {
        $set: {
          readBySeller: req.isSeller,
          readByUser: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { returnNewDocument: true }
    );

    return res.status(201).send(saveMessage);
  } catch (err) {
    return next(err);
  }
};
