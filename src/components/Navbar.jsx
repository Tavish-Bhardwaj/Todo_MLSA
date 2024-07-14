// eslint-disable-next-line no-unused-vars
import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar flex justify-between bg-pink-500 text-white p-4'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>Manage Tasks</span>
      </div>

      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
