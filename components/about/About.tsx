import React from "react";
import AboutCarousel from "./AboutCarousel";
import AboutExperience from "./AboutExperience";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import CustomerReviews from "./CustomerReviews";
import Team from "./Team";

const About = () => {
  return (
    <section className="w-full bg-custom4 text-primary-text pt-24 pb-24 lg:pt-[120px]">
      <div className="mx-auto px-4 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <div>
          <h1 className="text-[22px] font-semibold mb-3 sm:text-[30px]">
            About
          </h1>
          <div className="flex items-center gap-1.5 text-secondary font-light text-sm">
            <Link href="/">
              <h3 className="hover:text-primary-text transition-colors duration-300 ease-in-out">
                Home
              </h3>
            </Link>
            <span className="text-[19px]">
              <RiArrowRightSLine />
            </span>
            <h3 className="text-custom2">About</h3>
          </div>
        </div>
        <div className="lg:flex gap-5 mt-8">
          <div className="relative w-full bg-white px-5 py-7 rounded-xl lg:w-[50%]">
            <h4 className="text-sm text-custom2">How It Started</h4>
            <h1 className="text-primary-text text-[30px] font-semibold mt-3 leading-[45px] lg:text-[40px] lg:leading-[60px]">
              Our Dream is Global Rental Transformation In Real Estate.
            </h1>
            <p className="text-[15px] font-light text-secondary mt-5 leading-[27px] lg:absolute lg:bottom-5 lg:leading-[30px] ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
              odio est qui aspernatur eum velit repellat harum commodi facere?
              Adipisci alias quia ipsum distinctio unde, minima quidem, ipsam
              atque laboriosam velit doloremque ipsa harum facilis recusandae,
              excepturi sint eaque nobis voluptatum perferendis eum. Molestiae
              iste provident natus impedit? Perspiciatis id voluptate placeat
              non qui incidunt debitis omnis.
            </p>
          </div>
          <div className="w-full lg:w-[50%] mt-5 lg:mt-0">
            <AboutCarousel />
            <AboutExperience />
          </div>
        </div>
        <div>
          <Team />
          <CustomerReviews />
        </div>
      </div>
    </section>
  );
};

export default About;
