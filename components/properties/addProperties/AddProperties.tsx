import React from "react";
import AddPropertyLayout from "./AddPropertyLayout";
import { usePropertyContext } from "@/contexts/addPropertyContext/AddPropertyContext";


const AddProperties = () => {
  const { currentStep, setCurrentStep } = usePropertyContext();


  return (
    <>
      <h1 className="text-[22px] font-semibold text-primary-text">
        Add New Properties
      </h1>
      <section className="w-full bg-white shadow-2xl rounded-xl mt-8">
        <div className="flex justify-center items-center gap-0.5 flex-wrap border-b-[1px] border-custom11 pt-7 px-4 lg:justify-start">
          <div
            className="group text-sm font-semibold -mb-[1.2px]"
          >
            <div
              className={`${
                currentStep === 1
                  ? "text-primary-text"
                  : "text-secondary"
              } px-3.5 py-2.5 whitespace-nowrap transition-all duration-300 ease-in-out`}
            >
              1. Description
            </div>
            <div
              className={`${
               currentStep === 1
                  ? "bg-primary-text "
                  : "bg-transparent"
              } w-full h-[2px] rounded-t-sm transition-all duration-300 ease-in-out`}
            ></div>
          </div>
          <div
            className="group text-sm font-semibold -mb-[1.2px]"
            onClick={() => setCurrentStep(currentStep) }
          >
            <div
              className={`${
                currentStep === 2
                  ? "text-primary-text"
                  : "text-secondary "
              } px-3.5 py-2.5  whitespace-nowrap transition-all duration-300 ease-in-out`}
            >
              2. Photos
            </div>
            <div
              className={`${
                currentStep === 2
                  ? "bg-primary-text "
                  : "bg-transparent"
              } w-full h-[2px] rounded-t-sm transition-all duration-300 ease-in-out`}
            ></div>
          </div>
          <div
            className="group text-sm font-semibold -mb-[1.2px]"
          >
            <div
              className={`${
                currentStep === 3
                  ? "text-primary-text"
                  : "text-secondary"
              } px-3.5 py-2.5 whitespace-nowrap transition-all duration-300 ease-in-out`}
            >
              3. Amenities
            </div>
            <div
              className={`${
                currentStep === 3
                  ? "bg-primary-text "
                  : "bg-transparent"
              } w-full h-[2px] rounded-t-sm transition-all duration-300 ease-in-out`}
            ></div>
          </div>
        </div>
        <div className="p-[30px]">
          <AddPropertyLayout />
        </div>
      </section>
    </>
  );
};

export default AddProperties;
