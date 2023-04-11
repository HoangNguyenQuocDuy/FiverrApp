import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

require("dotenv").config();

const app = express();

app.use(bodyParser.json())

const port = process.env.PORT || 3003

app.get('/', (req, res) => {
    res.send('hell')
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})