import { Router } from "express";
import { auth } from "../middlewares/Auth.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId} from "../SocketIO/SocketServer.js";
import {io} from "../SocketIO/SocketServer.js"
import User from "../models/user.js";

const router = Router();

router.post("/send/:id", auth, async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.user.id;
    const receiverId = req.params.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    conversation.messages.push(newMessage._id);
    await User.findByIdAndUpdate(senderId, { lastMessage: message });
await User.findByIdAndUpdate(receiverId, { lastMessage: message });

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = await getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", newMessage);
    }

    return res.status(200).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error in sending message: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/get/:id", auth, async (req, res) => {
  try {
    const recieverId = req.params.id;
    const senderId = req.user.id;

    const conversation = await Conversation.findOne({participants: {$all: [senderId, recieverId]}}).populate("messages");
    if(conversation){
      const messages = conversation.messages;
      res.status(200).json({messages});
    }
    else{
      res.status(200).json({messages: []});
    }
  } catch (error) {
    console.log("Error in getting messages: ", error);
  }
});

export default router;