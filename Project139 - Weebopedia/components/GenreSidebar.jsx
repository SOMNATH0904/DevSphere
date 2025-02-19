'use client'
import React, { useEffect, useState } from 'react'
import { url } from '../public/config/apiUrl'

const GenreSidebar = () => {

    const [genreData, setgenreData] = useState([])
    const colors=['#FFDD95','#83DDC9','#9782A2','#B1C38F','#FC887B']


    useEffect(() => {

        const fetchGenres=async()=>{
            const res= await fetch(`${url}/genres/anime`)
            const data=await res.json()
            setgenreData(data)
            console.log("Gdvdsfdsfdsf", data)
        }
        setTimeout(() => {
            fetchGenres()
        }, 6000);
      
    }, [])

    
    

  return (
    <div className='w-[100%] glassmorphism bg-white p-8'>
        <div className=' font-bold text-center text-3xl mb-10'>
            Genre
        </div>
        <div className='flex flex-wrap justify-between'>
            {genreData && genreData?.data?.map((genre,index)=>(
                <div key={genre?.mal_id} className=' gap-5 my-5 text-lg font-bold w-[30%] whitespace-nowrap hover:scale-[1.1] duration-200 cursor-pointer overflow-hidden overflow-ellipsis' style={{color:colors[index % colors.length]}}>{genre?.name}</div>
            ))}
        </div>
    </div>
  )
}

export default GenreSidebar