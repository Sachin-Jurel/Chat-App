import { createContext, useState, useContext } from "react";

const ChatUserContext = createContext();

export const ChatUserProvider = ({ children }) => {
  const [currentChatUser, setCurrentChatUser] = useState(null);

  return (
    <ChatUserContext.Provider value={{ currentChatUser, setCurrentChatUser }}>
      {children}
    </ChatUserContext.Provider>
  );
};

export const useChatUser = () => useContext(ChatUserContext);
