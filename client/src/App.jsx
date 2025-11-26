import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/signup'
import ChatPage from './chat/chatPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path='/register' element={<Signup/>} />
      <Route path='/user' element={<ChatPage/>} />
    </Routes>
  )
}

export default App
