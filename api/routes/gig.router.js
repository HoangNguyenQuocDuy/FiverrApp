import express from "express";
import { createGig, deleteGig, getGig, getGigs } from "../controller/gig.controller";
import { verifyToken } from "../middleware/jwt";

const gigRoute = express.Router()

gigRoute.post('/',verifyToken , createGig)
gigRoute.delete('/single/:id',verifyToken , deleteGig)
gigRoute.get('/:id',verifyToken , getGig)
gigRoute.get('/',verifyToken , getGigs)

export default gigRoute