import express from "express";
import { deleteUser } from '../controller/user.controller'

const userRoute = express.Router()

userRoute.get('/test', deleteUser)

export default userRoute