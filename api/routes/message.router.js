import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getMessages, createMessage } from "../controller/message.controller"

const messageRoute = express.Router()

messageRoute.get('/:id', verifyToken, getMessages)
messageRoute.post('/', verifyToken, createMessage)

export default messageRoute