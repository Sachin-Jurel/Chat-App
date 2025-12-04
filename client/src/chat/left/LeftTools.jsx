import React, { useEffect } from 'react'
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../../assets/ChatLogo.png"

const LeftTools = () => {
  const navigate = useNavigate();
  const Logout = () => {
    try{
      const response = axios.post("https://chatzy-bx9a.onrender.com/logout", {}, {
        withCredentials: true,
      }
      );
    localStorage.removeItem('chat-app-user');
    navigate('/');
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className='flex justify-between mx-8'>
      <div>
        <img src={logo} alt="No" className=' w-14 ' />
      </div>
      <div>
        <LogOut onClick={Logout} className=' mt-3 h-8 w-8 text-slate-400 rotate-180 hover:text-slate-200 cursor-pointer '/>
      </div>
    </div>
  )
}

export default LeftTools
