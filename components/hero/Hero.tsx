import React from "react";
import { GiSpookyHouse } from "react-icons/gi";
import Image from "next/image";
import ExclusiveAgents from "./ExclusiveAgents";
import Search from "../search/Search";
import AdvanceSearch from "../search/AdvanceSearch";
import PrivateRoute from "../privateRoute/PrivateRoute";

const Hero = () => {
  return (
    <section className="relative font-nunito bg-custom4 w-full h-[1000px] ss:h-[680px] lg:h-[760px] xxl:h-[793px]">
      <div className="px-4 absolute right-0 left-0 z-20  mx-auto xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <section className="pt-[120px] md:pt-28 lg:pt-48 z-30 ">
          <h1 className="text-[32px] text-primary-text font-semibold xs:max-w-[493px] md:text-[40px]">
            Find The Perfect Place to Live While You Study.
          </h1>
         <Search />
          <div className="flex items-center gap-3 my-7 flex-wrap">
            <div className="flex items-center gap-3 px-3">
              <div className="border-l-[2px] border-l-custom1 py-6 md:py-7"></div>
              <div>
                <h1 className="text-[25px] font-semibold text-primary-text md:text-[30px]">
                  50K+
                </h1>
                <p className="text-[14px]">renters</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-3">
              <div className="border-l-[2px] border-l-custom1 py-6 md:py-7"></div>
              <div>
                <h1 className="text-[25px] font-semibold text-primary-text md:text-[30px]">
                  10K+
                </h1>
                <p className="text-[14px]">properties</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="hidden xl:block absolute top-5 right-0 -z-10 px-5 xxl:px-0 ">
            <div className="mt-36 xl:flex items-center gap-5 w-full">
              <div className="w-[330px] rounded-xl ">
                <Image
                  src="/assets/images/hero1.jpg"
                  alt="Hero House"
                  width={1000}
                  height={1000}
                  priority
                  className="h-[580px] rounded-xl"
                />
              </div>
              <div className="w-[280px] flex flex-col gap-5 mb-24">
                <Image
                  src="/assets/images/hero2.jpg"
                  alt="Hero House"
                  width={1000}
                  height={1000}
                  className="h-[280px] rounded-xl"
                />
                <Image
                  src="/assets/images/hero3.jpg"
                  alt="Hero House"
                  width={1000}
                  height={1000}
                  className="h-[280px] rounded-xl"
                />
              </div>
            </div>
          </div>
          <div className="hidden xxl:block absolute -bottom-[230px] right-[47.5%] px-5 xxl:px-0">
            <Image
              src="/assets/images/element-1.png"
              alt="Hero House"
              width={120}
              height={120}
              className="opacity-10 animate-spin-slow"
            />
          </div>
          <div className="hidden xxl:inline-block absolute top-[110px] -right-14 px-5 xxl:px-0 ">
            <Image
              src="/assets/images/element-1.png"
              alt="Hero House"
              width={120}
              height={120}
              className="opacity-10 animate-spin-slow"
            />
          </div>
          <PrivateRoute href="/contact">
          <ExclusiveAgents />
          </PrivateRoute>
        </section>
      </div>
      <div className="absolute -bottom-[7px] left-0 md:-bottom-3">
        <GiSpookyHouse className="text-[200px] text-custom10 opacity-30 md:text-[300px]" />
      </div>
    </section>
  );
};

export default Hero;
