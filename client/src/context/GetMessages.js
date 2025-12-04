import React, { useEffect, useState } from "react";
import axios from "axios";
import UseConversation from "../Manage/UseConversation.js";

const GetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = UseConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `https://chatzy-bx9a.onrender.com/message/get/${selectedConversation._id}`,
          { withCredentials: true }
        );

        setMessages(res.data.messages || []);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getMessages();
  }, [selectedConversation]);

  return { messages, loading };
};

export default GetMessages;
