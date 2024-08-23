import Image from "next/image";
import React from "react";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const CustomerReviews = () => {
  const customerReviewsData = [
    {
      photo: "/assets/agents/agent2.jpg",
      name: "Ahmad",
      comment:
        "Laudantium cupiditate veniam explicabo officia vitae sint modi nam repellat incidunt? Nemo expedita",
      icon: <BiSolidQuoteAltLeft />,
      color: false,
      id: 1,
    },
    {
      photo: "/assets/agents/agent3.jpeg",
      name: "Habiba",
      comment:
        "Laudantium cupiditate veniam explicabo officia vitae sint modi nam repellat incidunt? Nemo expedita",
      icon: <BiSolidQuoteAltLeft />,
      color: true,
      id: 2,
    },
    {
      photo: "/assets/agents/agent1.jpg",
      name: "Alkasim",
      comment:
        "Laudantium cupiditate veniam explicabo officia vitae sint modi nam repellat incidunt? Nemo expedita",
      icon: <BiSolidQuoteAltLeft />,
      color: false,
      id: 3,
    },
  ];

  return (
    <section className="mt-16 lg:mt-24">
      <h1 className="text-[22px] font-semibold text-primary-text sm:text-[30px] tracking-wide">
        Customer Reviews
      </h1>
      <p className="text-sm text-primary-text mt-1 lg:mt-0 lg:text-base">Our customers are always eager and ready to give a review.</p>
      <div className=" mt-7 px-3 py-10 border-[2px] border-custom13 border-dashed lg:flex justify-between items-center gap-5 sm:px-6 lg:mt-12 lg:px-12 lg:py-14 ">
        <div className="text-primary-text lg:max-w-[380px]">
          <h3 className="text-[30px] font-medium lg:text-[35px] lg:leading-[47px]">What Our Customers Say</h3>
          <p className="text-[15px] text-secondary font-light mt-3 max-w-[500px] leading-[27px] lg:leading-[30px]">
            Facere, eum earum corporis est perferendis consequatur error sed sit
            possimus assumenda, fugiat ipsa culpa natus necessitatibus velit
            quia eius, quasi hic possimus assumenda.
          </p>
          <button className="text-sm font-semibold text-white bg-custom6 hover:bg-custom2 transition-colors duration-300 ease-in-out py-3.5 px-12 rounded-md mt-9 lg:px-16">View More</button>
        </div>
        <div className="mt-10 lg:mt-0 lg:max-w-[500px]">
          <div className="w-full space-y-4 lg:pl-24">
            {customerReviewsData.map((reviews) => (
              <div key={reviews.id} className={`${reviews.color ? "border-0 shadow-2xl lg:-ml-20 lg:mr-20" : "border-[1.5px] border-l-0 border-gray-200"} relative flex items-center gap-3.5 bg-white  py-3.5 px-5 rounded-lg`}>
                <div className="max-w-[50px] h-[50px] bg-custom4 overflow-hidden rounded-full aspect-3/2 ss:max-w-[70px] ss:h-[70px]">
                  <Image
                    src={reviews.photo}
                    width={500}
                    height={500}
                    alt={reviews.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full">
                  <span className="flex justify-between items-center">
                    <h4 className="text-[15px] font-medium">{reviews.name}</h4>
                    <span className={`${reviews.color ? "text-custom6" : "text-gray-200"} text-[27px]`}>{reviews.icon}</span>
                  </span>
                  <p className="text-[13px] text-secondary mt-0.5 font-light tracking-wide leading-5 text-ellipsis italic line-clamp-3 lg:text-[12.5px] lg:mr-7">{reviews.comment}</p>
                </div>
                <div className={`${reviews.color ? "bg-custom6" : "bg-gray-200"} absolute top-0 left-0  h-full rounded-full w-2`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
