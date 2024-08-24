import Image from "next/image";
import React from "react";

const ApartmentByLocation = () => {
  const ApartmentByLocationData = [
    {
      image: "/assets/images/hero1.jpg",
      name: "New York",
      numberOfProperties: 120,
      id: 1,
    },
    {
      image: "/assets/images/hero2.jpg",
      name: "Los Angeles",
      numberOfProperties: 85,
      id: 2,
    },
    {
      image: "/assets/images/hero3.jpg",
      name: "Chicago",
      numberOfProperties: 90,
      id: 3,
    },
    {
      image: "/assets/images/hero4.jpg",
      name: "Houston",
      numberOfProperties: 70,
      id: 4,
    },
    {
      image: "/assets/images/hero4.jpg",
      name: "Miami",
      numberOfProperties: 60,
      id: 5,
    },
    {
      image: "/assets/images/hero3.jpg",
      name: "San Francisco",
      numberOfProperties: 40,
      id: 6,
    },
    {
      image: "/assets/images/hero2.jpg",
      name: "Seattle",
      numberOfProperties: 58,
      id: 7,
    },
    {
      image: "/assets/images/hero1.jpg",
      name: "Boston",
      numberOfProperties: 80,
      id: 8,
    },
  ];

  return (
    <section className="mx-auto px-4 pb-16 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:py-16 lg:px-5 xl:max-w-[1200px] xxl:px-0">
      <div>
        <h1 className="text-[20px] font-semibold text-primary-text sm:text-[30px]">
          Apartments by Location
        </h1>
        <p className="text-[15px] text-primary-text mt-1 lg:mt-0 lg:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <article className="mt-7 grid grid-cols-2 gap-x-5 gap-y-7 xs:gap-y-12 lg:mt-12 xl:gap-y-16 xl:grid-cols-4 xxl:grid-cols-4">
        {ApartmentByLocationData.map((apartment) => (
          <div
            key={apartment.id}
            className="flex flex-col xs:flex-row xs:items-center gap-3.5"
          >
            <div className="aspect-30/20 bg-custom1 rounded-md overflow-hidden xs:w-[128px] xs:h-[102px]">
              <Image
                src={apartment.image}
                alt={apartment.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className=" whitespace-nowrap">
              <h2 className="text-[15px] text-primary-text font-semibold mb-[5px]">
                {apartment.name}
              </h2>
              <p className="text-sm font-light text-secondary ">{`${
                apartment.numberOfProperties
              } ${
                apartment.numberOfProperties <= 1 ? "Apartment" : "Apartments"
              }`}</p>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default ApartmentByLocation;
