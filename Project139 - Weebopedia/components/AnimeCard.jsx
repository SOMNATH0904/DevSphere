'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AnimeCard = ({isNormal, rank, name, img, score, propClass }) => {

  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter=()=>{
    setIsHovered(true)
  }
  const handleMouseLeave=()=>{
    setIsHovered(false)
  }

  const HoverCard = ()=>{
    return(
      <div className="z-10 relative bottom-full bg-black p-5 flex flex-col gap-4 glassmorphism h-[320px] w-[224px] ">
    <div className="font-bold text-3xl">{name}</div>
    <div className="font-semibold text-xl">{score}</div>
    <div>synopsissjfhnsfndsjfndshjfb shjdbfhjsdbfhjsdb dfjkndsfnds fsd fhjds fhjds fj m djf dshjbdsfhjbsdfhjbsdfjh dsjbf sdbf jhsd fjsd fjds fjhsd fjshd f</div>
    <div>Extra info <br/>dfdsf<br/>dfdsf<br/>dfdsf</div>
    <div className="text-3xl font-bold">Button</div>
</div>
    )
  }

  return (
    <div onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      
    {!isNormal?
    <div
    
      className={` hover:scale-[1.1] duration-500 ${propClass} my-5`}
    >
      
      <div className="h-80 w-[270px] flex justify-end">
        <div className="h-80 w-[46px] flex justify-end flex-col items-center">
          <div
            className=" font-semibold text-2xl whitespace-nowrap rotate-180 overflow-hidden overflow-ellipsis"
            style={{ writingMode: "vertical-lr" }}
          >
            {name}
          </div>
          <div className=" font-extrabold text-3xl text-purple-800 mt-1">
            {String(rank).padStart(2, "0")}
          </div>
        </div>

        <Image src={img} alt={name} height={320} width={224}/>
      </div>
      <div className="ml-[46px] font-extrabold text-3xl text-purple-300 mt-1 text-center">
        {score}
      </div>
    </div>
    :
    <div
    
    className={`hover:scale-[1.1] duration-500 ${propClass} my-5`}
  >

    
      <Link href={'/animeData'} className="flex justify-end flex-col items-center min-h-[320px] w-[224px] text-center">
      <Image src={img} alt={name} height={320} width={224} className="h-[320px] object-cover"/>
      {/* {isHovered && <HoverCard/>} */}
      
        <div
          className=" overflow-ellipsis w-[224px] whitespace-nowrap overflow-hidden font-semibold text-xl"
        >
          {name}
        </div>
      </Link>
  </div>}
    </div>
  );
};

export default AnimeCard;
