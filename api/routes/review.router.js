import express from "express";
import { verifyToken } from "../middleware/jwt";
import { getReviews, deleteReview, createReview } from "../controller/review.controller";

const reviewRoute = express.Router()

reviewRoute.get('/:gigId', getReviews)
reviewRoute.post('/', verifyToken, createReview)
reviewRoute.get('/:id', deleteReview)

export default reviewRoute