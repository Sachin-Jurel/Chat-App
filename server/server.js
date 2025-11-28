import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRouter from "./Routes/userRoute.js";
import MessageRouter from "./Routes/MessageRoute.js"
import User from "./models/user.js";
// import io from "socket.io";
// import Message from "./models/message.model.js";
// import Conversation from "./models/conversation.js";

import connectDB from "./config/db.js";
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

import cookieParser from "cookie-parser";
import { auth } from "./middlewares/Auth.js";
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/users", auth ,async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.use("/", UserRouter);
app.use("/message", MessageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
