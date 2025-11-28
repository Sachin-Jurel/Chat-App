import React from 'react'
import RightPanelHeader from './RightHeader'
import ChatInput from './chatInput'
import Messages from './messages'

const Right = () => {
  return (
    <div className="w-[70%] relative bg-slate-100 text-white">

      {/* Fixed Header */}
      <div className="fixed w-[70%] top-0 z-10">
        <RightPanelHeader />
      </div>

      {/* Messages Area */}
      <div className="pt-20 pb-20 h-screen overflow-y-scroll hide-scrollbar bg-slate-400 p-5">
        <Messages />
      </div>

      {/* Chat Input Fixed Bottom */}
      <div className="fixed w-[70%] bottom-0 bg-slate-900 border-t border-slate-700 p-3">
        <ChatInput />
      </div>

    </div>
  )
}

export default Right
