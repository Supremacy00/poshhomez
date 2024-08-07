import React from "react";
import Image from "next/image";
import { GiFlowerStar } from "react-icons/gi";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";

const HeroPhoto = () => {
  return (
    <section className="font-nunito px-4 mt-16 mx-auto xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:px-5 xl:hidden">
      <div className="relative w-full aspect-2/2 overflow-hidden rounded-2xl xs:h-[350px] md:aspect-3/2 lg:h-[400px]">
        <Image
          src="/assets/images/hero1.jpg"
          alt="Hero Icon"
          width={1000}
          height={1000}
          className="relative w-full h-full object-cover"
        />
        <div className="w-full h-full absolute z-10 top-0 bg-gradient-to-t from-[#070707]/70"></div>
        <div className="text-white absolute z-20 top-7 left-3 right-3 flex items-center gap-4 xs:left-5 xs:right-5">
          <div className="text-[22px] bg-black p-2.5 rounded-full">
            <GiFlowerStar />
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#e3e2e2] bg-opacity-95 py-3 px-3 xs:px-5 ">
            <p className="text-primary-text text-[13px] ss:text-[14.5px] font-normal xs:text-base">
              Show Top-Rated Apartments
            </p>
            <Link
              href="/listings"
              className="bg-black p-[5px] rounded-full text-[12px]"
            >
              <GoArrowUpRight />
            </Link>
          </div>
        </div>
        <h3 className="absolute bottom-5 left-3 right-3 z-20 leading-8 text-[22px] font-semibold text-white xs:left-5 xs:right-5">
          Find Your Perfect Space – Simple, Cheap, Convenient, and Ready to Move
          In!
        </h3>
      </div>
      <div className="flex items-center gap-3 mt-4 ">
        <div className="relative w-full h-full aspect-3/2 overflow-hidden rounded-2xl lg:h-[200px]">
          <Image
            src="/assets/images/hero2.jpg"
            alt="Hero Icon"
            width={1000}
            height={1000}
            className="relative w-full h-full object-cover"
          />
          <div className="w-full h-full absolute z-10 top-0 bg-gradient-to-t from-[#070707]/80"></div>
          <h3 className="absolute bottom-4 left-3 right-3 z-20 leading-6 line-clamp-2 text-base font-semibold text-white">
            Furnished living room for comfort.
          </h3>
        </div>
        <div className="relative w-full h-full aspect-3/2 overflow-hidden rounded-2xl lg:h-[200px]">
          <Image
            src="/assets/images/hero4.jpg"
            alt="Hero Icon"
            width={1000}
            height={1000}
            className="relative w-full h-full object-cover"
          />
          <div className="w-full h-full absolute z-10 top-0 bg-gradient-to-t from-[#070707]/80"></div>
          <h3 className="absolute bottom-4 left-3 right-3 z-20 leading-6 line-clamp-2 text-base font-semibold text-white">
            New modern design with a great colors.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default HeroPhoto;
