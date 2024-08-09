import React from "react";
import AboutCarousel from "./AboutCarousel";
import AboutExperience from "./AboutExperience";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import CustomerReviews from "./CustomerReviews";

const About = () => {
  return (
    <section className="w-full font-nunito bg-custom4 text-primary-text pt-24 pb-24 lg:pt-[120px]">
      <div className="mx-auto px-4 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <div>
          <h1 className="text-[22px] font-semibold mb-3 tracking-wide  sm:text-[30px]">
            About
          </h1>
          <div className="flex items-center gap-1.5 text-secondary font-light text-sm lg:text-[15px]">
            <Link href="/">
              <h3 className="hover:text-primary-text transition-colors duration-300 ease-in-out">
                Home
              </h3>
            </Link>
            <span className="text-[19px]">
              <RiArrowRightSLine />
            </span>
            <h3 className="text-sm text-custom2">About</h3>
          </div>
        </div>
        <div className="lg:flex gap-5 mt-8">
          <div className="relative w-full bg-white px-5 py-7 rounded-xl lg:w-[50%]">
            <h4 className="text-sm text-custom2">How It Started</h4>
            <h1 className="text-primary-text text-[32px] font-semibold mt-3 tracking-wide leading-[45px] lg:text-[40px] lg:leading-[60px]">
              Our Dream is Global Rental Transformation In Real Estate.
            </h1>
            <p className="text-base font-light text-secondary mt-5 leading-[27px]  lg:absolute lg:bottom-5 lg:leading-[30px] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              quam dolorum, illo voluptate laboriosam maxime, voluptates odio
              corrupti quia quod magnam dignissimos. Animi officia fugiat labore
              rem atque, neque voluptate. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat quam dolorum, illo voluptate laboriosam
              maxime, voluptates odio corrupti quia quod magnam dignissimos.
              Animi officia fugiat labore rem atque, neque voluptate.
            </p>
          </div>
          <div className="w-full lg:w-[50%] mt-5 lg:mt-0">
            <AboutCarousel />
            <AboutExperience />
          </div>
        </div>
        <div>
          <CustomerReviews />
        </div>
      </div>
    </section>
  );
};

export default About;
