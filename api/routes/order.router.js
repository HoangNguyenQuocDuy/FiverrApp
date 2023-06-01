import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getOrder, intent, confirm } from '../controller/order.controller'

const orderRoute = express.Router()

// orderRoute.post('/:id', verifyToken, createOrder)
orderRoute.post('/create-payment-intent/:id', verifyToken, intent)
orderRoute.get('/', verifyToken, getOrder)
orderRoute.put('/', verifyToken, confirm)

export default orderRoute