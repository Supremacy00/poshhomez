import React from 'react'
import useApartmentDetails from '@/hooks/useApartmentDetails';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Map from '../Map';

const Address = () => {
    const { propertyDetails } = useApartmentDetails();
  const { address, location} = propertyDetails?.data ?? {};
  

  return (
    <section className="text-primary-text bg-white rounded-xl  p-6 mt-8 xl:p-8">
        <div>
        <h3 className="text-[17px] font-semibold mb-5">Address</h3>
        </div>
        <div className="mt-10">
        <div className="flex justify-between items-center gap-3 text-[14.5px]">
            <h5 className="font-semibold">Address</h5>
            <p className="line-clamp-1">{address}</p>
        </div>
        <div className="flex justify-between items-center gap-3 text-[14.5px] mt-4">
            <h5 className="font-semibold">State/County</h5>
            <p>{location?.state}</p>
        </div>
        <div className="flex justify-between items-center gap-3 text-[14.5px] mt-4">
            <h5 className="font-semibold">Country</h5>
            <p>{location?.country}</p>
        </div>
        <div className="flex justify-between items-center gap-3 text-[14.5px] mt-4">
            <h5 className="font-semibold">City</h5>
            <p>{location?.city}</p>
        </div>
        <div className="flex justify-between items-center gap-3 text-[14.5px] mt-4">
            <h5 className="font-semibold">Zip/Postal Code</h5>
            <p>{location?.postal_code}</p>
        </div>
        </div>
        <section className="w-full h-[300px] mt-10 ">
            <Map address={address} zoom={10}/>
        </section>
      </section>
  )
}

export default Address