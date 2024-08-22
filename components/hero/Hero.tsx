'use client'
import React from "react";
import { GiFlowerStar, GiSpookyHouse } from "react-icons/gi";
import Image from "next/image";
import ExclusiveAgents from "./ExclusiveAgents";
import Search from "../search/Search";
import PrivateRoute from "../privateRoute/PrivateRoute";
import HeroPhoto from "./HeroPhoto";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

const Hero = () => {
  return (
    <>
      <section className="relative bg-custom4 w-full h-[1000px] ss:h-[690px] md:h-[630px] lg:h-[740px] xl:h-[785px] xxl:h-[780px]">
        <div className="text-primary-text px-4 absolute right-0 left-0 mx-auto xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
          <section className="pt-[100px] md:pt-28 lg:pt-44 z-30 ">
            <h1 className="text-[36px] font-semibold text-center sm:text-start leading-[47px] xs:max-w-[493px] md:text-[45px] md:leading-[65px] md:max-w-[550px] xl:max-w-[493px]  ">
              Explore Your New Home, and Live with Ease.
            </h1>
            <Search />
            <div className="flex items-center gap-3 my-7 flex-wrap">
              <div className="flex items-center gap-3 px-3">
                <div className="border-l-[2px] border-l-custom1 py-6 md:py-7"></div>
                <div>
                  <h1 className="text-[25px] font-semibold md:text-[30px]">
                  500K+
                  </h1>
                  <p className="text-[13px] font-normal">Renters</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-3">
                <div className="border-l-[2px] border-l-custom1 py-6 md:py-7"></div>
                <div>
                  <h1 className="text-[25px] font-semibold md:text-[30px]">
                  200K+
                  </h1>
                  <p className="text-[13px] font-normal">Properties</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="hidden xl:block absolute top-5 right-0 -z-10 px-5 xxl:px-0 ">
              <div className="mt-36 xl:flex items-center gap-5 w-full">
                <div className="relative w-[330px] rounded-xl overflow-hidden ">
                  <Image
                    src="/assets/images/hero1.jpg"
                    alt="Hero House"
                    width={1000}
                    height={1000}
                    priority
                    className="h-[580px] rounded-xl"
                  />
                  <div className="text-white absolute z-50 top-9 left-3 right-3 flex items-center gap-4">
                    <div className="text-[22px] bg-black p-2.5 rounded-full">
                      <GiFlowerStar />
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-[#e3e2e2] bg-opacity-95 py-3 px-3 ">
                      <p className="text-primary-text text-[13px] font-normal">
                        Show Top-Rated Apartments
                      </p>
                      <Link
                        href="/listings"
                        className="bg-black p-[5px] rounded-full text-[12px] cursor-default"
                      >
                        <GoArrowUpRight />
                      </Link>
                    </div>
                  </div>
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
                    src="/assets/images/hero4.jpg"
                    alt="Hero House"
                    width={1000}
                    height={1000}
                    className="h-[280px] rounded-xl"
                  />
                </div>
              </div>
            </div>
            <div className="hidden xxl:block absolute -bottom-[155px] right-[47%] px-5 xxl:px-0">
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
      <HeroPhoto />
    </>
  );
};

export default Hero;
