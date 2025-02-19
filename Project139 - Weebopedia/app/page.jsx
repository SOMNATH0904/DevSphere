import DoublePartition from '@/components/DoublePartition'
import MainCrousel from '@/components/MainCrousel'
import Seasonal from '@/components/Seasonal'
import TopAnime from '@/components/TopAnime'
import Upcoming from '@/components/Upcoming'
import React from 'react'

const page = () => {
  return (
    <>
      <MainCrousel/>
      <TopAnime/>
      <Seasonal homepage={true}/>
      <DoublePartition/>
    </>
  )
}

export default page