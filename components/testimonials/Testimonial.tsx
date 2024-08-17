import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonial = () => {
  return (
    <section className="bg-custom4 text-primary-text py-16 lg:py-32">
      <div className="mx-auto px-4 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <div className="w-full lg:flex items-center gap-5">
          <div className="text-primary-text lg:w-[50%] xl:w-[65%]">
            <h1 className="text-[20px] font-semibold xs:text-[30px]">
              People Love Living with PoshHomez
            </h1>
            <p className="text-[15px] mt-1 lg:mt-0 lg:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="mt-8 xs:flex items-center gap-10 lg:mt-16">
              <div>
                <h1 className="text-[42px] font-semibold">0%</h1>
                <p className="text-[15px] lg:text-base">Completed Property</p>
              </div>
              <div className="mt-2 xs:mt-0">
                <h1 className="text-[42px] font-semibold">0%</h1>
                <p className="text-[15px] lg:text-base">Satisfied Customers</p>
              </div>
              <div className="mt-2 xs:mt-0">
                <h1 className="text-[42px] font-semibold">0%</h1>
                <p className="text-[15px] lg:text-base">Home Ownership</p>
              </div>
            </div>
          </div>
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
