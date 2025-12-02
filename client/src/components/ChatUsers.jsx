import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UseConversation from "../Manage/UseConversation.js";
import { SocketContext } from "../context/SocketContext.jsx";

const ChatUsers = () => {
  const [users, setUsers] = useState([]);
  const { selectedConversation, setSelectedConversation } = UseConversation();
  const { socket, onlineUsers } = SocketContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users", {
          withCredentials: true,
        });
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex-1 overflow-x-hidden p-3 space-y-3 h-[540px] overflow-y-scroll hide-scrollbar">
      {users.map((user) => {
        const isOnline = onlineUsers.includes(user._id);

        return (
          <div
            onClick={() => setSelectedConversation(user)}
            key={user._id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
              ${
                selectedConversation?._id === user._id
                  ? "bg-cyan-900"
                  : "bg-slate-800 hover:bg-slate-700"
              }
            `}
          >
            <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
              <img
                src={
                  user.avatar ||
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlgMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQYHBAUDAv/EADkQAAEEAQICBgYHCQAAAAAAAAABAgMEBQYREjETISJBUWEHcYGRodEjJDJCYrHBFBUzUnJzgrLw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwClgA0AAAAAAAAAAAAAANk3AAkgAASQSBAAAAAAAAJAAEAAAAAAAAAAAAAAAAAAAAAAAAAAACS1aW0dPlmttXVdBTX7KJ9qX1eCeYFVaiudwtRVd4J1qdbMVkXs4mUbLm+KRKbHjsRQxkaMpVo4tubkTdy+3mdq+RKMHngmru4Z4pI3eD2qh+Dd5oIp2cE8bJGrza9EVCoag0JWsMfPiNq86dfRKu7H+rwUUZuQfWxBLWnfBYjdHKxdnNdzRT5lEAAAAACqAAAAAAAAAALForB/vjJ8Uzfqtftyb8nL3NNZY1rWo1iIjUTZETuQrmgKSVtNwybduw50rl+CfBCybEAINiSAQpIAp+v8C25RdkazPrNdO3sn22d/uMz9pvT2o9rmuTdrk2VDD8rV/YcnaqpttFK5qerfqKOQAFAAAAAAAAAAACSABs+lHI7TeO4dtugb7z1ipeji+2zg1quX6WrIqbfhXrRfzQtpAABAAAELzMa1aqO1LkFbtt0u3wQ2G1OytXlsSqiMiarnKvghhtuw63bmsPXd0r1evtXcuD4gAoAAAAAAAAAAAAAPV03mJMJk2Wmoro17MrE+835mw07UFytHYqyJJFIm7XIYSetgdQXsHKq1XI+Fy9uF69lfPyXzINnBWMXrnEXGoll7qcvekqdn2OQ9lmZxb2cbcjUVvj0zfmQdwPFu6qwlNqq+/HI5PuQ9tV9xTNQa5s32ur45jq1depXqv0jk/Qo6vSDqNszVxFKRHMRfrD28lX+X5lGC9a7rzIKJIAAAAAAAAAAAAAAAJB34nD38vLwUYFeic3quzW+tS5430eV2tR2StvkcvWscScKJ7RRnhHV5Gy1dL4Stt0eOhcqd8icX5namMx7U2SjWRP7TRRh3tQlDap8FibH8XHVl/wAET8jxr+g8TYaq1llqvXkrF4k9yijLiCx5rRuTxiOkjalqBOb4k609bSuCgCSAAAAAAAAAABIEF10poxbjWXMs17IF62QcnP8ANfBD86D0029I3JX40Wuxfoo3cnr4r5IaSQfiCCKvC2GCNscbU2a1qbIh9OogIQSAAAAAd+5WdS6QqZVr56yNr3OaOROy/wDqT9SzADCrtSxQsvrW4limYuzmr/3I5zX9W6ejzlJVjRrbsabxP8fwr5GRSMfE90cjVa9q7ORe5fAo/IAKAAAAAAdmHoPymTr0o14VmdsrvBE61X3Ipxlw9GVXpczYtKnVBBsnrcvyRSaNIqwR1a8deBvDHG3hankfUAgAAAAAAAAAAAZl6SMT+yZNmQibtFa6n7d0ifNDTSs+kODptNSv74ZGP+O36gZQADQAAAAABoHorRODJO7+KNP9gBovoAMgAAAAAAAAAAB4+sGNk0xkUdySHf3KgAwY0gANAAAP/9k="
                }
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            <div>
              <p className="text-slate-100 font-medium">{user.name}</p>
              <p className="text-slate-400 text-sm">
                {user.lastMessage || "No message"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatUsers;
