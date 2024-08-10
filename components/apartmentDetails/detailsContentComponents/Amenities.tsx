import React from 'react'
import useApartmentDetails from '@/hooks/useApartmentDetails';

const Amenities = () => {
    const { propertyDetails } = useApartmentDetails();
    const { amenities } = propertyDetails?.data ?? {};
  return (
    <section className="text-primary-text bg-white rounded-xl shadow-2xl p-6 mt-8 xl:p-8">
        <h3 className="text-[17px] font-semibold mb-7">Features & Amenities</h3>
        <ul className="text-[15px]">
            {amenities?.map((amenity, index) => (
                 <li key={index} className="flex items-center gap-2.5 pb-3 ">
                 <div className="min-w-[6px] h-[6px] rounded-full bg-primary-text"></div>
                  <p>{amenity.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Amenities