import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { UserContext } from "./userContext.jsx";

const socketContext = createContext();

export const SocketContext =()=>{
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const newSocket = io("https://chatzy-bx9a.onrender.com/", {
                query: { userId: user._id },
            });
            setSocket(newSocket);
            newSocket.on("getOnline", (users) => {
                setOnlineUsers(users);
            })
            return () => {
                newSocket.close();
            }
        } else {
            if (socket) socket.close();
            setSocket(null);
        }
    }, [user]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};
