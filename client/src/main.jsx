import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import {UserContextProvider} from './context/userContext.jsx'
import { ChatUserProvider } from './context/chatUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ChatUserProvider>
          <App />
        </ChatUserProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
)
