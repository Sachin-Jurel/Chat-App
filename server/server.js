import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRouter from "./Routes/userRoute.js";
import MessageRouter from "./Routes/MessageRoute.js";
import User from "./models/user.js";
import { app, server } from "./SocketIO/SocketServer.js";
import Conversation from "./models/conversation.js";

import connectDB from "./config/db.js";
connectDB();

const PORT = process.env.PORT || 5000;

import cookieParser from "cookie-parser";
import { auth } from "./middlewares/Auth.js";
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/users", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
    }).sort({ updatedAt: -1 });

    const conversedUserIds = conversations
      .map((c) => c.participants.find((p) => p.toString() !== userId))
      .filter(Boolean);

    const uniqueConversedUserIds = [
      ...new Set(conversedUserIds.map((id) => id.toString())),
    ];

    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    const usersWithConversation = uniqueConversedUserIds
      .map((id) => allUsers.find((u) => u._id.toString() === id))
      .filter(Boolean);

    const usersWithoutConversation = allUsers.filter(
      (u) => !uniqueConversedUserIds.includes(u._id.toString())
    );

    const usersOrdered = [
      ...usersWithConversation,
      ...usersWithoutConversation,
    ];

    res.json(usersOrdered);
  } catch (error) {
    console.log(error);
  }
});

app.use("/", UserRouter);
app.use("/message", MessageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
