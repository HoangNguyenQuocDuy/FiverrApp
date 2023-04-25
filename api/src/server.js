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

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname));

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';");
    return next();
});

const port = process.env.PORT || 3003;

// const connect = async () => {
//     await mongoose.connect(process.env.MONGO)
// }

ConnectDB();

app.use("/api/users", userRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);
app.use("/api/gig", gigRoute);
app.use("/api/message", messageRoute);
app.use("/api/auth", authRouter);

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
