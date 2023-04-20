import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ConnectDB from '../config/connectDB';
import userRoute from '../routes/user.router';
import conversationRoute from '../routes/conversation.router';
import orderRoute from '../routes/order.router';
import reviewRoute from '../routes/review.router';
import gigRoute from '../routes/gig.router';
import messageRoute from '../routes/message.router';
import authRouter from '../routes/auth.route';
import cookieParser from 'cookie-parser'
import mongoose, { connect } from 'mongoose';

dotenv.config();

const app = express();
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT || 3003

// const connect = async () => {
//     await mongoose.connect(process.env.MONGO)
// }

ConnectDB()

app.use('/api/users', userRoute)
app.use('/api/conversation', conversationRoute)
app.use('/api/order', orderRoute)
app.use('/api/review', reviewRoute)
app.use('/api/gig', gigRoute)
app.use('/api/message', messageRoute)
app.use('/api/auth', authRouter)


//custom return error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)
})

app.get('/', (req, res) => {
    res.send('hell')
})

app.listen(port, () => {
    console.log('listening on port ' + port)
})