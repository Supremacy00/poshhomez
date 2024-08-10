"use client";
import React, { useEffect, useState } from "react";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import { testimonialData } from "../data";
import Image from "next/image";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const TestimonialCarousel = () => {
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
    <section className="relative mx-auto mt-10 lg:w-[50%] xl:w-[35%] lg:mt-0">
      <div className="overflow-hidden rounded-lg">
        <div
          className="max-w-full flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 2s ease-in-out",
          }}
        >
          {testimonialData.map((item) => {
            return (
              <article
                key={item.id}
                className="w-full flex-shrink-0 px-[30px] py-7 bg-white"
              >
                <div>
                  <div>
                    <span className="flex justify-between items-center">
                      <h1 className="text-base font-semibold">{item.title}</h1>
                      <BiSolidQuoteAltLeft className="text-[40px] text-custom2 text-opacity-10" />
                    </span>
                    <p className="text-sm text-secondary leading-7 mt-4">{item.comment}</p>
                    <div className="flex items-center gap-1.5 text-amber-500 text-[12px] mt-4">
                      {item.ratings.map((rating, index) => (
                        <article key={`star-${index}`}>{rating}</article>
                      ))}
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 mt-6" />
                  </div>
                  <div className="flex items-center gap-4 flex-wrap mt-5">
                    <div className="max-w-[60px] h-[60px] bg-custom4 overflow-hidden rounded-full aspect-3/2">
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
                      <p className="text-[13px] text-secondary font-normal">
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
      <div className="flex justify-center pb-5 mt-4">
        <div className="absolute flex items-center gap-3.5">
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
  );
};

export default TestimonialCarousel;
