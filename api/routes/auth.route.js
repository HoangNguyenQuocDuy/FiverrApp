import express from "express";
import multer from "multer"
import path from "path"
require ('dotenv').config()

import { register, login, logout, handleUploadFile, uploadMultiFiles, refreshToken } from '../controller/auth.controller'
import uploadCloud from '../middleware/uploader'

const authRouter = express.Router();

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/upload', uploadCloud.single('img'), handleUploadFile);
authRouter.post('/uploads', uploadCloud.array('imgs'), uploadMultiFiles);
authRouter.post('/register', register)
authRouter.post('/refresh-token', refreshToken)

export default authRouter