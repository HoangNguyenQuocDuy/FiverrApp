import express from "express";

const reviewRoute = express.Router()

reviewRoute.get('/test', (req, res) => {
    res.send('review')
})

export default reviewRoute