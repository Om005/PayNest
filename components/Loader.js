import React from 'react'

const Loader = () => {
  return (
    <div>
      <div className="min-h-screen bg-black flex items-center justify-center">
  <div className="flex space-x-2">
    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s] shadow-green-500 shadow-lg"></div>
    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s] shadow-green-500 shadow-lg"></div>
    <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce shadow-green-500 shadow-lg"></div>
  </div>
</div>

    </div>
  )
}

export default Loader
