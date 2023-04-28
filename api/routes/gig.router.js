import express from "express";
import { createGig, deleteGig, getGig, getGigs } from "../controller/gig.controller";
import { verifyToken } from "../middleware/jwt";

const gigRoute = express.Router()

gigRoute.post('/',verifyToken , createGig)
gigRoute.get('/single/:id',verifyToken , getGig)
gigRoute.post('/:id',verifyToken , deleteGig)
gigRoute.post('/',verifyToken , getGigs)

export default gigRoute