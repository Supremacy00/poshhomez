"use client";
import React, { useState, useEffect } from "react";
import { testimonialData } from "../data";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Image from "next/image";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <section className="font-nunito bg-custom4 text-primary-text py-16 lg:py-32">
      <div className="mx-auto px-4 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <div className="lg:flex items-center gap-5">
          <div className="lg:w-[50%] xl:w-[70%]">
            <h1 className="text-[20px] font-semibold xs:text-[30px]">
              People Love Living with PoshHomez
            </h1>
            <p className="text-[15px] lg:text-base">
              Aliquam lacinia diam quis lacus euismod
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
          <section className="relative mx-auto mt-10 lg:w-[50%] xl:w-[30%] lg:mt-0">
            <div className="overflow-hidden rounded-lg">
              <div
                className="max-w-full flex"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 2s ease-in-out",
                }}
              >
                {testimonialData.map((item, index) => {
                  return (
                    <article
                      key={item.id}
                      className="w-full flex-shrink-0 px-[30px] py-7 bg-white"
                    >
                      <div>
                        <div>
                          <span className="flex justify-between items-center">
                            <h1 className="text-base font-semibold">
                              {item.title}
                            </h1>
                            <BiSolidQuoteAltLeft className="text-[40px] text-custom2 text-opacity-10" />
                          </span>
                          <p className="text-[14px] leading-7 mt-4">
                            {item.comment}
                          </p>
                          <div className="flex items-center gap-1.5 text-amber-500 text-[12px] mt-4">
                            {item.ratings.map((rating, index) => (
                              <article key={`star-${index}`}>{rating}</article>
                            ))}
                          </div>
                          <div className="w-full h-[1px] bg-gray-200 mt-6" />
                        </div>
                        <div className="flex items-center gap-4 flex-wrap mt-5">
                          <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-[15px] font-semibold mb-1">
                              {item.name}
                            </h3>
                            <p className="text-[13px] font-dm font-light">
                              {item.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center pb-5">
              <div className="absolute mt-3 flex items-center gap-3.5">
                <div className="text-[20px] mr-2 hover:scale-125 hover:-translate-x-1 transition-all duration-500 ease-in-out cursor-pointer">
                  <LiaLongArrowAltLeftSolid onClick={handlePrev} />
                </div>
                {testimonialData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`rounded-full ${
                      index === currentIndex
                        ? "bg-primary-text rounded w-2 h-2 transition-all duration-700  ease-in-out"
                        : "w-1.5 h-1.5 bg-custom1 transition-all duration-700 ease-in-out"
                    }`}
                  ></button>
                ))}
                <div className="text-[20px] ml-2 hover:scale-125 hover:translate-x-1 transition-all duration-500 ease-in-out cursor-pointer">
                  <LiaLongArrowAltRightSolid onClick={handleNext} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
