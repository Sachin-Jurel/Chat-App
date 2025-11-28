import React from "react";
import GetMessages from "../../context/GetMessages.js";
import Loading from "../../components/Loading.jsx";
import { useContext } from "react";
import { UserContext } from "../../context/userContext.jsx";

const Messages = () => {
  const { messages, loading } = GetMessages();
  const { user } = useContext(UserContext);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pb-10">
          {messages.map((message) => (
            <div
              key={message._id}  // 🔥 Important
              className={`chat ${
                message.senderId === user?._id ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  message.senderId === user?._id
                    ? "chat-bubble-accent rounded-bl-xl"
                    : "chat-bubble-primary rounded-br-xl"
                } rounded-t-xl`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Messages;
