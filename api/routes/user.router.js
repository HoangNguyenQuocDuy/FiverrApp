import express from "express";
import { deleteUser } from '../controller/user.controller'
import { verifyToken } from "../middleware/jwt";

const userRoute = express.Router()

// userRoute.get('/test', deleteUser)
userRoute.delete('/:id', verifyToken, deleteUser)

export default userRoute