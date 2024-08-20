import React from "react";
import useApartmentDetails from '@/hooks/useApartmentDetails';

const formatCurrency = (rent_fee: number) => {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  
    return formatter.format(rent_fee);
  };
  
const ApartmentDescription = () => {
    const { propertyDetails } = useApartmentDetails();
  const { about, rent_fee, description, year_built, is_occupied} = propertyDetails?.data ?? {};

  const formattedRentFee = rent_fee !== undefined ? formatCurrency(rent_fee) : "N/A";

  return (
      <section className="text-primary-text bg-white rounded-xl  p-6 mt-8 xl:p-8">
        <div>
        <h3 className="text-[17px] font-semibold mb-5">Apartment Description</h3>
        <p className="text-[15px] leading-[27px]">{about}</p>
        </div>
        <div className="mt-10">
        <h3 className="text-[17px] font-semibold mb-7">Apartment Details</h3>
        <div className="flex justify-between items-center gap-2 text-[14.5px]">
            <h5 className="font-semibold">Price</h5>
            <p>{formattedRentFee}</p>
        </div>
        <div className="flex justify-between items-center gap-2 text-[14.5px] mt-4">
            <h5 className="font-semibold">Bedroom</h5>
            <p>{description?.bedroom_count}</p>
        </div>
        <div className="flex justify-between items-center gap-2 text-[14.5px] mt-4">
            <h5 className="font-semibold">Bathroom</h5>
            <p>{description?.bathroom_count}</p>
        </div>
        <div className="flex justify-between items-center gap-2 text-[14.5px] mt-4">
            <h5 className="font-semibold">Year Built</h5>
            <p>{year_built}</p>
        </div>
        <div className="flex justify-between items-center gap-2 text-[14.5px] mt-4">
            <h5 className="font-semibold">Apartment Status</h5>
            <p>{`${is_occupied ? "Occupied" : "Available"}`}</p>
        </div>
        </div>
      </section>
  );
};

export default ApartmentDescription;
