import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { FiSearch } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
export default function Navbar() {
  return (
    <div className='flex items-center justify-between py-3 font-medium pr-24'>
    <div>
      <img src="assets/img/logo.png" className='h-14 w-14' alt="">
      </img>
    </div>
    <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
      <NavLink className='flex flex-col  items-center gap-1 '>
        <p>HOME</p>
        <hr className='w-2/4 boder-none h-[1.5px] bg-gray-700 hidden' />
      </NavLink>
      <NavLink to='/collection' className='flex flex-col  items-center gap-1 '>
        <p>COLLECTION</p>
        <hr className='w-2/4 boder-none h-[1.5px] bg-gray-700 hidden' />
      </NavLink>
      <NavLink to='/' className='flex flex-col  items-center gap-1 '>
        <p>ABOUT</p>
        <hr className='w-2/4 boder-none h-[1.5px] bg-gray-700 hidden' />
      </NavLink>
      <NavLink to='/' className='flex flex-col  items-center gap-1 '>
        <p>CONTACT</p>
        <hr className='w-2/4 boder-none h-[1.5px] bg-gray-700 hidden' />
      </NavLink>


    </ul>
    <div className='flex items-center gap-6'>
      <FiSearch className='w-5 cursor-pointer h-8' />
      <div className='group relative'>
        <CgProfile className='w-5 cursor-pointer h-8' />
        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
          <div className='flex flex-col gap-2  w-52 py-3  px-5 bg-slate-100 text-gray-500  rounded'>
            <p className='cursor-pointer hover:text-black'> My Profile</p>
           <NavLink to='/cartshopping'><p className='cursor-pointer hover:text-black'> Order</p></NavLink> 
            <p className='cursor-pointer hover:text-black'> Log Out</p>
          </div>
        </div>
      </div>
      <Link className='relative'>
      <NavLink to='/cartshopping'><FaShoppingCart className='w-5 cursor-pointer h-8' /></NavLink>
      <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black aspect-square rounded-full text-white text-[10px]'>10</p>
      </Link>
     
    </div>
  </div>
  )
}
