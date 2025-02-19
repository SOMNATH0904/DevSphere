import React from 'react'
import Upcoming from './Upcoming'
import Heading from './Heading'
import GenreSidebar from './GenreSidebar'

const DoublePartition = () => {
  return (
    <>
    <div className='lg:flex gap-0'>
      <div className='lg:w-[70%]'>
    <Upcoming/>
    </div>
{/*     <div className='lg:w-[30%]'>
    <GenreSidebar/>
    </div> */}
    </div>
    </>
  )
}

export default DoublePartition
