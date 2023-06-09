import express from "express";
import { createGig, deleteGig, getGigsById, getGigs } from "../controller/gig.controller";
import { verifyToken } from "../middleware/jwt";

const gigRoute = express.Router()

gigRoute.post('/',verifyToken , createGig)
gigRoute.delete('/single/:id',verifyToken , deleteGig)
gigRoute.get('/:id', getGigsById)
gigRoute.get('/', getGigs)

export default gigRoute