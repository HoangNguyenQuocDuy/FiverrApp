import express from "express";
import multer from "multer"
import path from "path"
require ('dotenv').config()

import { register, login, logout, handleUploadFile, getAvatar } from '../controller/auth.controller'
import uploadCloud from '../middleware/uploader'

const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/upload', uploadCloud.single('img'), handleUploadFile);
authRouter.post('/register', register)

export default authRouter