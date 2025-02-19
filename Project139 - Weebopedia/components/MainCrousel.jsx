"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const coruselData = [
  {
    img: "/assets/onePiece.png",
    desc: "You want to keep everyone from dying? That's naive. It's war. People die.",
    author: "Monkey D Luffy",
  },
  {
    img: "/assets/bleach.jpg",
    desc: "Dont break anyone’s heart, they only have one. Break their bones, they have 206.",
    author:"Ichigo Kurosaki"
  },
  {
    img: "/assets/naruto.png",
    desc: "While you're alive, you need a reason for your existence. Being unable to find one is the same as being dead.",
    author:"Naruto Uzumaki"
  },
];

const MainCrousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevCoursel = () => {
    const isFirstindex = currentIndex === 0;
    const newIndex = isFirstindex ? coruselData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const forwardCoursel = () => {
    // const isLastindex=currentIndex===coruselData.length-1
    const newIndex = (currentIndex + 1) % coruselData.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const IntervalId = setInterval(() => {
      forwardCoursel();
    }, 5000);

    return () => {
      clearInterval(IntervalId);
    };
  }, [currentIndex]);

  return (
    <div className="w-full flex justify-end group relative">
      <div
        style={{ backgroundImage: `url(${coruselData[currentIndex].img})` }}
        className="soft_image w-[1300px] h-[603px] rounded-2xl duration-500 scale-[1.09] -mt-16"
      ></div>
      <div className="tracking-wider leading-snug max-w-2xl absolute flex font-bold md:text-4xl text-2xl px-10 w-auto self-center left-[15%] scale-125">
        {coruselData[currentIndex].desc}
      </div>
      <div className="tracking-wider leading-snug max-w-2xl absolute flex font-bold md:text-4xl text-2xl px-10 w-auto self-center left-[25%] scale-125 bottom-20">
        -{coruselData[currentIndex].author}
      </div>
      <HiChevronLeft
        size={60}
        className="lg:hidden group-hover:block absolute lg:top-[50%] lg:left-0 lg:translate-x-[200%] bottom-0 left-[35%] hover:scale-[1.5] duration-200 opacity-75"
        onClick={() => {
          prevCoursel();
        }}
      />
      <HiChevronRight
        size={60}
        className="lg:hidden group-hover:block absolute lg:top-[50%] lg:right-0 lg:translate-x-[-200%] bottom-0 right-[35%] hover:scale-[1.5] duration-200 opacity-75"
        onClick={() => {
          forwardCoursel();
        }}
      />
    </div>
  );
};

export default MainCrousel;
