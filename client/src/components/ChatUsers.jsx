import React from "react";
import { useContext } from "react";
import { useChatUser } from "../context/chatUserContext.jsx";

const users = [
  { id: 1, name: "Reetu", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "Hello!" },
  { id: 2, name: "Riya Kapoor", avatar: "https://i.pravatar.cc/150?img=2", lastMessage: "Call me when free" },
  { id: 3, name: "Mohit Verma", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "I'm coming!" },
  { id: 4, name: "Ayushi Mehta", avatar: "https://i.pravatar.cc/150?img=4", lastMessage: "Thank you 😊" },
  { id: 5, name: "Arjun Sharma", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hey, what's up?" },
  { id: 6, name: "User 6", avatar: "https://i.pravatar.cc/150?img=6", lastMessage: "Let's go." },
  { id: 7, name: "User 7", avatar: "https://i.pravatar.cc/150?img=7", lastMessage: "See you soon." },
  { id: 8, name: "User 8", avatar: "https://i.pravatar.cc/150?img=8", lastMessage: "Good night." }
];

const ChatUsers = () => {
  const {setCurrentChatUser} = useChatUser();
  return (
    <div className="flex-1 overflow-x-hidden p-3 space-y-3 overflow-y-scroll hide-scrollbar h-full">
      {users.map((user) => (
        <div
          onClick={() => setCurrentChatUser(user)}
          key={user.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer transition"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <p className="text-slate-100 font-medium">{user.name}</p>
            <p className="text-slate-400 text-sm">{user.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatUsers;
