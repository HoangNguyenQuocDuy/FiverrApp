import express from "express";

const conversationRoute = express.Router()

conversationRoute.get('/test', (req, res) => {
    res.send('conversation')
})

export default conversationRoute