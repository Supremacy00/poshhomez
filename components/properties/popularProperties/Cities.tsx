import React from "react";
import Image from "next/image";
import Map from "@/components/apartmentDetails/Map";

const Cities = () => {
  return (
    <section className="font-nunito mx-auto px-4 pb-16 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:py-12 lg:px-5 xl:max-w-[1200px] xxl:px-0">
      <div>
        <h1 className="text-[20px] font-semibold text-primary-text sm:text-[30px]">
          Apartments by Cities
        </h1>
        <p className="text-base mt-1 lg:mt-0">
          Aliquam lacinia diam quis lacus euismod
        </p>
        <div className="w-full aspect-3/2 xs:h-[350px] mt-8 overflow-hidden rounded-xl lg:mt-16 lg:h-[550px] xxl:h-[650px]">
          <Map address="Samaru Campus, Community Market, Zaria 810211, Kaduna" zoom={15} />
        </div>
      </div>
    </section>
  );
};

export default Cities;
