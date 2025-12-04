import React, { useState, useContext } from "react";
import axios from "axios";
import UseConversation from "../Manage/UseConversation.js";
import { SocketContext } from "./SocketContext.jsx";

const SendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = UseConversation();
  const { socket } = SocketContext();

  const sendMessages = async (messageText, senderId) => {
    if (!messageText.trim() || !selectedConversation?._id) return;

    const tempMsg = {
      _id: Date.now().toString(),
      senderId,
      receiverId: selectedConversation.userId,
      message: messageText,
    };

    setMessages((prev) => [...prev, tempMsg]);
    setLoading(true);

    try {
      const res = await axios.post(
        `https://chatzy-bx9a.onrender.com/message/send/${selectedConversation._id}`,
        { message: messageText },
        { withCredentials: true }
      );

      setMessages((prev) =>
        prev.map((m) => (m._id === tempMsg._id ? res.data.newMessage : m))
      );

      if (socket) {
        socket.emit("sendMessage", res.data.newMessage);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.filter((m) => m._id !== tempMsg._id));
    }

    setLoading(false);
  };

  return { sendMessages, loading };
};

export default SendMessages;
