import express from "express";
import { verifyToken } from "../middleware/jwt";
import { createOrder, getOrder } from '../controller/order.controller'

const orderRoute = express.Router()

orderRoute.post('/:id', verifyToken, createOrder)
orderRoute.get('/', verifyToken, getOrder)

export default orderRoute