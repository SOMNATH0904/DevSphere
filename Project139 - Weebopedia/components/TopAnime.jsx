'use client'
import React, { useEffect, useRef, useState } from 'react'
import Heading from './Heading'
import AnimeCard from './AnimeCard'
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { url } from '../public/config/apiUrl';

const TopAnime = () => {

    const [topAnimeData, setTopAnimeData] = useState([])
    const containerRef = useRef(null)

    const fetchTopAnime=async()=>{

      try {
        const res=await fetch(`${url}/top/anime`)
        const data=await res.json()
        setTopAnimeData(data)
        console.log(data);
        
      } catch (error) {
        console.log("Unable to fetch Top Animes", error);
      }
        
    }

    // useEffect(() => {
    //   console.log('sfdsdfdsfds', topAnimeData?.data?.[0]);
    // }, [topAnimeData])
    

    useEffect(() => {

        fetchTopAnime()
    }, [])
    
  // return (
  //   <div className='w-full'>
      
  //   <div id='topAnime' className='items-center flex flex-col w-full  overflow-hidden'>
        // <Heading title={'Top Animes'}/>
  //       <div className='flex gap-20 justify-around'>
  //       {topAnimeData?.data?.map((item)=>(
  //         <AnimeCard key={item.mal_id} score={item.score} rank={item.rank} name={item.title_english} img={item.images.jpg.large_image_url} 
  //         />

  //       ))}
           
  //       </div>
      
        
  //   </div>
  //   <HiChevronLeft
  //       size={60}
  //       className="relative right-[60px] -translate-y-[224px] hover:scale-[1.5] duration-200 opacity-75"
  //       onClick={() => {
  //         forwardCoursel();
  //       }}
  //     />
    
  //           <HiChevronRight
  //       size={60}
  //       className="relative -translate-y-[284px] left-full hover:scale-[1.5] duration-200 opacity-75"
  //       onClick={() => {
  //         forwardCoursel();
  //       }}
  //     />
  //   </div>
  // )

  const scrollLeft = () => {
    const width=containerRef.current.clientWidth
    containerRef.current.scrollLeft=containerRef.current.scrollLeft-width
  };

  const scrollRight = () => {
    const width=containerRef.current.clientWidth
    console.log(width);
    containerRef.current.scrollLeft=containerRef.current.scrollLeft+width
  };

  // useEffect(() => {
  //   // Update the container's width based on the number of cards
  //   if (containerRef.current) {
  //     const cardWidth = containerRef.current.clientWidth/1.5; // Assuming 4 cards  visible at a time
  //     const containerWidth = cardWidth * topAnimeData?.data?.length;
  //     containerRef.current.style.width = `${containerWidth}px`;
  //   }
  // }, [topAnimeData]); 

  

  return(
    <div className='w-[100%] relative'>
      <div>
        <Heading title={'Top Animes'}/>
      </div>
      {topAnimeData && topAnimeData.data && topAnimeData.data.length > 0? <>
      <div className='absolute flex items-end right-[50%] -translate-y-36 justify-center h-full '>
        <HiChevronLeft size={120} className='z-10 opacity-90 hover:scale-150 duration-200 h-20 ' onClick={()=>{scrollLeft()}}/>
      </div>
      <div className='absolute flex items-end left-[50%] -translate-y-36 justify-center h-full '>
        <HiChevronRight size={120} className='z-10 opacity-90 hover:scale-150 duration-200 h-20' onClick={()=>{scrollRight()}}/>
      </div>
      <div className='flex gap-24  overflow-x-hidden overflow-y-visible scroll-smooth scale-[0.8]' ref={containerRef}>
            {topAnimeData?.data?.map((item,index)=>(
          <AnimeCard isNormal={false} key={item.mal_id} score={item.score} rank={index+1} name={item.title_english} img={item.images.jpg.large_image_url} propClass=''/>
            ))}
            {/* <AnimeCard  score={topAnimeData?.data?.score} rank={0+1}/> */}
      </div>
      </>:<span className="loader relative left-1/2"></span>}
     
    </div>
  )
}

export default TopAnime