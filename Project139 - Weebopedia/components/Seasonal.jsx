'use client'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import AnimeCard from './AnimeCard'
import { url } from '../public/config/apiUrl'

const Seasonal = ({homepage}) => {

    const [seasonalData, setSeasonalData] = useState([])
    const [isExpand, setIsExpand] = useState(false)

    

    const fetchSeason=async()=>{

        try {
            const res= await fetch(`${url}/seasons/now`)
            const data= await res.json()
            console.log(data);
            setSeasonalData(data)
        } catch (error) {
            console.log("Error Fetching Seasonals", error);
        }
    }

    useEffect(() => {
      

      setTimeout(() => {
        fetchSeason()
      }, 1500);
    }, [])
    

  return (
    <>
        <Heading title={'This Season'}/>

        <div className={`flex w-full flex-wrap gap-10 justify-center ${isExpand?'max-h-full':'max-h-[1300px]'} overflow-hidden my-10 py-10 duration-200`}>

        {seasonalData && seasonalData.data && seasonalData.data.length>0?<>{seasonalData?.data?.map((item)=>(
            <AnimeCard key={item.mal_id} name={item?.title_english || item?.title} score={item.score} img={item.images.jpg.large_image_url} isNormal={true}/>
        ))}</>: <span className='relative loader'/>}

        

</div>
<div className=' text-lg text-center font-semibold cursor-pointer' onClick={()=>{setIsExpand(!isExpand)}}>{isExpand?"< View Less":"View More >"}</div>
    </>
  )
}

export default Seasonal