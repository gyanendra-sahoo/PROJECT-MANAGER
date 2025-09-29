import React, { useState } from 'react'
import { HiOutlineX } from 'react-icons/hi'
import { HiOutlineMenu } from 'react-icons/hi'
import SideMenu from './SideMenu'
const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 sticky top-0 z-30'>
      <button 
      onClick={() => {
        setOpenSideMenu(!openSideMenu);
      }}
      className='block lg:hidden text-black'>
        {
          openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )
        }
      </button>
      <div className='flex gap-1 items-center'>
        <img src="/images/logo-1.png" className='w-12 h-10' alt="" />
        <h2 className='text-lg font-medium text-black'><span className='text-[#1F4167] font-bold'>PRO</span><span>TASKER</span></h2>
      </div>
      {
        openSideMenu && (
          <div className='fixed top-[61px] -ml-4 bg-white'>
            <SideMenu activeMenu={activeMenu} />
          </div>
        )
      }
    </div>
  )
}

export default Navbar
