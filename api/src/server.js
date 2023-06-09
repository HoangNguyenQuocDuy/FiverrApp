import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ConnectDB from "../config/connectDB";
import userRoute from "../routes/user.router";
import conversationRoute from "../routes/conversation.router";
import orderRoute from "../routes/order.router";
import reviewRoute from "../routes/review.router";
import gigRoute from "../routes/gig.router";
import messageRoute from "../routes/message.router";
import authRouter from "../routes/auth.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import checkTokenExpiration from "../middleware/checkTokenExpiration";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';");
    return next();
});

const port = process.env.PORT || 3003;


// const connect = async () => {
//     await mongoose.connect(process.env.MONGO)
// }

ConnectDB();

// app.use(checkTokenExpiration)
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/messages", messageRoute);

//custom return error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.get("/", (req, res) => {
  res.send("hell");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
