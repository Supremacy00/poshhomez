import React from "react";
import Overview from "./detailsContentComponents/Overview";
import ApartmentDescription from "./detailsContentComponents/ApartmentDescription";
import Address from "./detailsContentComponents/Address";
import Amenities from "./detailsContentComponents/Amenities";

const DetailsContent = () => {

  return (
      <section>
        <Overview />
        <ApartmentDescription />
        <Address />
        <Amenities />
      </section>
  );
};

export default DetailsContent;
