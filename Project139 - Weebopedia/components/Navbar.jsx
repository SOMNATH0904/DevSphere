'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenu,IoCloseSharp } from "react-icons/io5";

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <div className=" px-10 w-full mb-10 mt-5 justify-between items-center flex z-10">
      <Link href={'/'}>
        <Image src={"/assets/logo.png"}
        alt="Logo"
        height={250}
        width={250}
        className="hover:scale-[1.1] duration-200"/>
      </Link>

      {/* Desktop Nav */}
      <section className=" md:flex hidden">
        <div className="flex items-center lg:gap-10 lg:text-xl md:font-m font-medium gap-5 ml-5">
         <Link href={'/home'} className="nav_text">Home</Link>
         <Link href={'/about'} className="nav_text">About</Link>
         <Link href={'/genre'} className="nav_text">Genre</Link>
         <Link href={'#topanime'} className="nav_text">Top Anime</Link>
         <Link href={'/community'} className="nav_text">Community</Link>
         <button type="button" className="lg:w-24 lg:h-12 h-8 w-16  rounded-full  bg-purple-800 mx-5 hover:bg-purple-900 hover:scale-[1.2] duration-200 ">Login</button>
         </div>
      </section>

      {/* Mobile Nav */}
      <section className=" md:hidden flex">
        {toggleMenu?
        <div>
        <IoCloseSharp size={40} className="hover:scale-[1.2] duration-200" onClick={()=>{setToggleMenu(!toggleMenu)}}/>

        <div className="absolute right-10 flex flex-col items-center gap-4 mt-5 text-lg font-medium p-5 bg-white glassmorphism">

          <Link href={'/home'} className="nav_text">Home</Link>
          <Link href={'/about'} className="nav_text">About</Link>
          <Link href={'/genre'} className="nav_text">Genre</Link>
          <Link href={'#topanime'} className="nav_text">Top Anime</Link>
          <Link href={'/community'} className="nav_text">Community</Link>
         <button type="button" className="h-10 w-20  rounded-full  bg-purple-800 mx-5 hover:bg-purple-900 hover:scale-[1.2] duration-200 ">Login</button>
         </div>
         </div>:
         <IoMenu size={40} className="hover:scale-[1.2] duration-200" onClick={()=>{setToggleMenu(!toggleMenu)}}/>}
        
        
      </section>
    </div>
  );
};

export default Navbar;
