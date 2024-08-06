import Image from "next/image";
import React from "react";

const AboutCarousel = () => {
  return (
    <div className="w-full h-[300px] overflow-hidden rounded-xl">
      <Image
        src="/assets/images/about-photo.jpg"
        width={500}
        height={500}
        alt="About Photo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default AboutCarousel;
