import React, {  useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext.jsx'
import Left from './left/left'
import Right from './right/right'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) navigate('/');

  
  return (
    <div className='h-screen flex'>
      <Left/>
      <Right />
    </div>
  )
}

export default ChatPage
