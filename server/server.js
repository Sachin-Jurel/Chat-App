import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRouter from "./Routes/userRoute.js";
import MessageRouter from "./Routes/MessageRoute.js"

import connectDB from "./config/db.js";
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

import cookieParser from "cookie-parser";
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

app.use("/", UserRouter);
app.use("/message", MessageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
