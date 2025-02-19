'use client'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import AnimeCard from './AnimeCard'
import { url } from '../public/config/apiUrl'

const Upcoming = () => {

    const [upcomingData, setUpcomingData] = useState([])
    const [isExpand, setIsExpand] = useState(false)

    const fetchUpcoming=async()=>{
        const res=await fetch(`${url}/seasons/upcoming`)
        const data= await res.json()
        console.log(data)
        setUpcomingData(data)   
    }

    useEffect(() => {
        setTimeout(() => {
            fetchUpcoming()
        }, 4000);
      
    }, [])
    
  return (
    <div>
        <Heading title={'Top Upcoming'}/>
        <div className={`flex flex-wrap gap-8 overflow-hidden w-[100%] pt-5 scale-[0.8] -mt-48 justify-center`}>
            {upcomingData && upcomingData.data && upcomingData.data.length>0?
            < >
                {upcomingData?.data?.map((item)=>(
                    <AnimeCard isNormal={true} key={item.mal_id} name={item?.title_english || item?.title} score={item.score} img={item.images.jpg.large_image_url}/>
                ))}
            </>:<span className='relative loader'/>}
        </div>
        {/* <div className=' text-lg text-center font-semibold cursor-pointer bottom-0 relative -mt-20' onClick={()=>{setIsExpand(!isExpand)}}>{isExpand?"< View Less":"View More >"}</div> */}

    </div>
  )
}

export default Upcoming