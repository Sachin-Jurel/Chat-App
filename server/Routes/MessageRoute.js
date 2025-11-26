import { Router } from "express";
import { auth } from "../middlewares/Auth.js";
import Conversation from "../models/conversation.js";
import Message from "../models/message.model.js";

const router = Router();

router.post("/send/:id", auth, async (req, res)=>{
    try {
        const {message} = req.body;
        const senderId = req.user.id;
        const recieverId = req.params.id;
        
        const conversation = await Conversation.findOne({participants: {$all: [senderId, recieverId]}});
        if(!conversation){
            const newConversation = new Conversation({
                participants: [senderId, recieverId],
            })
            const newMessage = new Message({
                senderId,
                recieverId,
                message
            })
            if(newMessage){
                await newConversation.messages.push(newMessage);
            }
            await Promise.all([newConversation.save(), newMessage.save()]);
            res.status(200).json({message: "Message sent successfully", newMessage})
        }
    } catch (error) {
        console.log("Errror in sending message: ", error);
        res.status(500).json({message: "internal server error"})
    }
})

export default router;