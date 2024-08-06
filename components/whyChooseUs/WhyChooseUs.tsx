import React from "react";
import Image from "next/image";
import { PiBuildingsLight } from "react-icons/pi";
import { FaHouseLock } from "react-icons/fa6";
import { SiGoogletagmanager } from "react-icons/si";
import { AiFillPropertySafety } from "react-icons/ai";
import { RiCurrencyFill } from "react-icons/ri";

const WhyChooseUs = () => {
  return (
    <section className="mx-auto font-nunito px-4 pb-16 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:py-12 lg:px-5 xl:max-w-[1200px] xxl:px-0 xl:py-24">
      <div className="md:flex items-center gap-7 lg:gap-16 xl:gap-28">
        <div className="relative">
          <div className="bg-custom4 overflow-hidden aspect-547/634 rounded-lg xs:w-[547px] md:max-w-[336px] md:h-[450px] lg:max-w-[456px] lg:h-[529px] xl:max-w-[546px] xl:h-[633px] xxl:max-w-[600px] xxl:h-[650px]">
            <Image
              src="/assets/images/card2.jpg"
              alt="Hero House"
              width={1000}
              height={1000}
              quality={50}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="group absolute bottom-5 -right-3 transition-all duration-500 ease-in-out lg:-right-8 ">
            <div className=" bg-white p-5 rounded-lg cursor-pointer shadow-md group-hover:bg-custom2 transition-colors duration-500 ease-in-out">
              <div className="flex items-center gap-3">
                <span className=" bg-custom2 px-3.5 py-3.5 rounded-full group-hover:bg-custom6 transition-colors duration-500 ease-in-out">
                  <FaHouseLock className="text-[30px] text-white" />
                </span>
                <div className="text-primary-text group-hover:text-white transition-colors duration-500 ease-in-out">
                  <h3 className="text-[14px]">Total Rent</h3>
                  <h1 className="text-[20px] font-semibold">4,540 Unit</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-8 md:mt-0 ">
            <h1 className="text-[20px] font-semibold md:text-[30px]">
              Why Choose Us
            </h1>
            <p className="text-[15px] text-secondary leading-7 mt-1 lg:text-base ">
              As the complexity of buildings to increase, the field of
              architecture.
            </p>
          </div>
          <div className="mt-5 xl:mt-12">
            <div className="flex items-center gap-5 group">
              <span className=" bg-custom8 px-5 py-5 rounded-full group-hover:bg-custom2 transition-colors duration-500 delay-100 ease-in-out">
                <SiGoogletagmanager className="text-[30px] text-custom2 group-hover:text-white transition-colors duration-500 delay-100 ease-in-out" />
              </span>
              <div className="mt-2">
                <h3 className="text-[15px]  text-primary-text font-semibold mb-1">
                  Property Management
                </h3>
                <h1 className="text-[15px] text-secondary leading-7 lg:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat quam dolorum.
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-5 group">
              <span className="bg-custom8 px-5 py-5 rounded-full group-hover:bg-custom2 transition-colors duration-500 delay-100 ease-in-out">
                <AiFillPropertySafety className="text-[30px] text-custom2 group-hover:text-white transition-colors duration-500 delay-100 ease-in-out" />
              </span>
              <div className="mt-2">
                <h3 className="text-[15px] text-primary-text font-semibold mb-1">
                  Mortgage Services
                </h3>
                <h1 className="text-[15px] text-secondary leading-7 lg:text-base ">
                  Nullam sollicitudin blandit eros eu pretium. Nullam maximus
                  ultricies auctor.
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-5 group">
              <span className="bg-custom8 px-5 py-5 rounded-full group-hover:bg-custom2 transition-colors duration-500 delay-100 ease-in-out">
                <RiCurrencyFill className="text-[30px] text-custom2 group-hover:text-white transition-colors duration-500 delay-100 ease-in-out" />
              </span>
              <div className="mt-2">
                <h3 className="text-[15px] text-primary-text font-semibold mb-1">
                  Currency Services
                </h3>
                <h1 className="text-[15px] text-secondary leading-7 lg:text-base ">
                  Fugiat quam dolorum, illo voluptate laboriosam maxime,
                  voluptates odio corrupti.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
