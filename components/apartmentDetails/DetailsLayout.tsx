import React from 'react'
import DetailsContent from './DetailsContent'
import TourSchedule from './TourSchedule'

const DetailsLayout = () => {

  return (
    <section className="mt-5 mb-10 lg:mt-16 lg:flex gap-7 xxl:gap-8">
        <div className="lg:w-[62%] xl:w-[66%]">
            <DetailsContent />
        </div>
        <div className='mt-8 lg:mt-0 lg:w-[38%] xl:w-[34%]'>
            <TourSchedule />
        </div>
    </section>
  )
}

export default DetailsLayout