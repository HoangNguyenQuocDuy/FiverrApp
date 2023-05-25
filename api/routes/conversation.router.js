import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getConversations, createConversation, updateConversation, getConversation } from '../controller/conversation.controller'

const conversationRoute = express.Router()

conversationRoute.get('/', verifyToken, getConversations)
conversationRoute.get('/single/:id', verifyToken, getConversation)
conversationRoute.post('/', verifyToken, createConversation)
conversationRoute.put('/:id', verifyToken, updateConversation)

export default conversationRoute