import React from "react";
import ApartmentDetailsPage from "./ApartmentDetailsPage";
import { ApartmentIdProvider } from "@/contexts/apartmentIDContext/ApartmentIdContext";

const ApartmentDetailsLayout = () => {

  return (
    <ApartmentIdProvider>
    <div className="mt-[63px] lg:mt-[84px]">
      <ApartmentDetailsPage  />
    </div>
    </ApartmentIdProvider>
  )
};

export default ApartmentDetailsLayout;
