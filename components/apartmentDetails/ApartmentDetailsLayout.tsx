import React from "react";
import ApartmentDetailsPage from "./ApartmentDetailsPage";
import { ApartmentIdProvider } from "@/contexts/apartmentIDContext/ApartmentIdContext";

const ApartmentDetailsLayout = () => {

  return (
    <ApartmentIdProvider>
    <div className="lg:mt-[83px]">
      <ApartmentDetailsPage  />
    </div>
    </ApartmentIdProvider>
  )
};

export default ApartmentDetailsLayout;
