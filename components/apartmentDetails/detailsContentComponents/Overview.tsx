import React from 'react'
import useApartmentDetails from '@/hooks/useApartmentDetails';
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { MdOutlineCalendarMonth } from "react-icons/md";

const Overview = () => {
  const { propertyDetails } = useApartmentDetails();
  const { description, year_built, } = propertyDetails?.data ?? {};
  
  return (
        <div className="text-primary-text bg-white rounded-xl shadow-2xl p-6 xl:p-8">
          <h3 className="text-[17px] font-semibold mb-7">Overview</h3>
          <div className="space-y-6 ss:space-y-0 ss:grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="border-[1px] border-custom11 p-3.5 text-[22px] rounded-xl inline-block">
                <IoBedOutline />
              </span>
              <div className="text-[14.5px]">
                <h5 className="font-semibold">Bedroom</h5>
                <p>{description?.bedroom_count}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="border-[1px] border-custom11 p-3.5 text-[22px] rounded-xl inline-block">
                <LiaBathSolid />
              </span>
              <div className="text-[14.5px]">
                <h5 className="font-semibold">Bath</h5>
                <p>{description?.bathroom_count}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="border-[1px] border-custom11 p-3.5 text-[22px] rounded-xl inline-block">
                <MdOutlineCalendarMonth />
              </span>
              <div className="text-[14.5px]">
                <h5 className="font-semibold">Year Built</h5>
                <p>{year_built}</p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Overview