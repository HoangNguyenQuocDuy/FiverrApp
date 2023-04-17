import express from "express";

const messageRoute = express.Router()

messageRoute.get('/test', (req, res) => {
    res.send('message')
})

export default messageRoute