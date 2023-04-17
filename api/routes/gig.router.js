import express from "express";

const gigRoute = express.Router()

gigRoute.get('/test', (req, res) => {
    res.send('gig')
})

export default gigRoute