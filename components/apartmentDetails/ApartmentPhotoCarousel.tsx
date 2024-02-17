"use client";
import React, { useState, useEffect, useCallback } from "react";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import Image from "next/image";
import { ApartmentPhotoCarouselProps } from "@/@types";

const ApartmentPhotoCarousel: React.FC<ApartmentPhotoCarouselProps> = ({
  photos,
  name,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  const previousSlide = () => {
    setCurrentImage(currentImage === 0 ? photos?.length - 1 : currentImage - 1);
  };
  const nextSlide = useCallback(() => {
    setCurrentImage(currentImage === photos?.length - 1 ? 0 : currentImage + 1);
  }, [currentImage, photos]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage, nextSlide]);
  const sliderStyles = {
    transform: `translateX(-${currentImage * 100}%)`,
    transition: "transform 1s ease-in-out",
  };

  return (
    <section className="relative overflow-hidden">
      <div className="flex items-center" style={sliderStyles}>
        {photos.map((photo) => (
          <div
            key={photo.public_id}
            className="relative w-full flex-shrink-0 h-[250px] sm:h-full sm:aspect-250/80 "
          >
            <Image
              src={photo.secure_url}
              alt={name}
              width={1000}
              height={1000}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-[1020px] flex justify-between items-center px-8 absolute top-1/2 right-0 left-0 xl:max-w-[1100px] xxl:px-0 xxl:max-w-[1300px]">
        <PrevButton onClick={previousSlide} />
        <NextButton onClick={nextSlide} />
      </div>
      <div className="w-full h-full absolute top-0 bg-gradient-to-t from-[#070707]/50" />
    </section>
  );
};

export default ApartmentPhotoCarousel;
