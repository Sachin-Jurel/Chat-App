import React from 'react'
import RightPanelHeader from './RightHeader'
import ChatInput from './chatInput'
import Messages from './messages'

const Right = () => {
  return (
    <div className='w-[70%] bg-slate-100 text-white'>
      <div><RightPanelHeader/></div>
      <div className="p-5 h-[80vh] bg-slate-400"><Messages/></div>
      <div className='fixed w-[70%] bottom-0 bg-slate-900 border-t border-slate-700 p-3'><ChatInput/></div>
    </div>
  )
}

export default Right
