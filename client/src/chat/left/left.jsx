import React from 'react'
import LeftTools from './LeftTools'
import SearchBox from '../../components/Search'
import ChatUsers from '../../components/ChatUsers'

const Left = () => {
  return (
    <div className='w-[30%] bg-slate-950 flex text-white'>
      <div className='h-screen w-[15%] bg-slate-900'>
        <LeftTools />
      </div>

      <div className='w-full h-screen flex flex-col'>
        <div className='p-2'>
          <SearchBox />
        </div>

        <div className='flex-1 overflow-y-auto overflow-x-hidden'>
          <ChatUsers />
        </div>
      </div>
    </div>
  )
}

export default Left
