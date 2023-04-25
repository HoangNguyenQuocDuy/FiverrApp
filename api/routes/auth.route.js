import express from "express";
import multer from "multer"
import path from "path"

import { register, login, logout, handleUploadFile } from '../controller/auth.controller'

const authRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/avatars/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

authRouter.post('/uploadAvatar', upload.single('img'), handleUploadFile)
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

export default authRouter