'use client'
import React from "react";
import ApartmentDetailsPage from "./ApartmentDetailsPage";
import { Provider } from "react-redux";
import store from "@/redux/store";

const ApartmentDetailsLayout = () => {
  

  return (
    <Provider store={store}>
    <div className="mt-[63px] lg:mt-[84px]">
      <ApartmentDetailsPage  />
    </div>
    </Provider>
  )
};

export default ApartmentDetailsLayout;
