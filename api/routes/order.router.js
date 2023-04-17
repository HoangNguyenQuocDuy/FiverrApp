import express from "express";

const orderRoute = express.Router()

orderRoute.get('/test', (req, res) => {
    res.send('order')
})

export default orderRoute