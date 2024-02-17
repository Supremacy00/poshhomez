import React from "react";
import ApartmentDetailsPage from "./ApartmentDetailsPage";
import { ApartmentIdProvider } from "@/contexts/apartmentIDContext/ApartmentIdContext";

const ApartmentDetailsLayout = () => {

  return (
    <ApartmentIdProvider>
    <div className="lg:mt-[90px]">
      <ApartmentDetailsPage  />
    </div>
    </ApartmentIdProvider>
  )
};

export default ApartmentDetailsLayout;
