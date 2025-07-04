import React from 'react'
import { Plus } from "lucide-react"
import userImage from '../../assets/images/user-avatar-icon.png'

const Board = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Board</h1>
          <select className="text-sm border-0 bg-transparent text-gray-500">
            <option>Daily Tasks</option>
          </select>

          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <img src={userImage} className='rounded-full w-10 h-10' alt='user image' />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-sm flex items-center gap-1">
            <span>Filters</span>
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create task</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 min-w-max"> 

        </div>
      </div>
    </div>
  )
}

export default Board