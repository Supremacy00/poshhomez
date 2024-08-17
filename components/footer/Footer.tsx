import React from "react";
import { footerData, footerIcons } from "../data";
import { HiHomeModern } from "react-icons/hi2";

const Footer = () => {
  const {
    header1,
    header2,
    header3,
    tele,
    email,
    address1,
    address2,
    address3,
    weekdays1,
    weekdays2,
    weekdays3,
    weekdays4,
    offers1,
    offerPara,
    rights,
  } = footerData;

  return (
    <footer className="bg-primary-text">
      <div className="px-4 pb-8 mx-auto w-full lg:max-w-[993px] lg:px-5 xl:max-w-[1200px]  xxl:px-0">
        <div className="text-white mx-auto py-8 md:flex justify-between items-center xl:py-10">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative bg-custom2 w-11 h-11 rounded-[40%]">
              <HiHomeModern className="absolute text-[22px] inset-[11px] text-white" />
            </div>
            <h3 className="text-[20px] font-sans font-semibold">
              pos<span className="text-custom2">H</span>
              <span className="-ml-2">
                <span className="text-custom2">H</span>omez
              </span>
            </h3>
          </div>
          <ul className="flex items-center gap-5 flex-wrap mt-5 text-[14px] text-white md:mt-0 xxl:gap-12 font-light">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Services</li>
            <li>Support</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="w-full bg-custom5 h-[1px]" />
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-5 lg:grid-cols-3 xl:grid-cols-4">
          <div className="mt-8 font-light lg:mt-11 xl:mt-16">
            <h1 className="text-[14px] uppercase font-semibold text-white">
              {header2}
            </h1>
            <div className="text-[14px] mt-1.5 leading-6 font-normal text-custom1">
              <p className="mt-5  ">{address1}</p>
              <p className="">{address2}</p>
              <p>{address3}</p>
            </div>
          </div>
          <div className="mt-7 lg:mt-11 xl:mt-16">
            <h1 className="text-[14px] uppercase font-semibold text-white">
              {header1}
            </h1>
            <h3 className="text-[18px] font-medium mt-4 text-white xxl:text-[24px] not-italic no no-underline">
              {tele}
            </h3>
            <p className="text-[14px] font-normal text-custom1 mt-1 not-italic no-underline">
              {email}
            </p>
          </div>
          <div className="mt-7 font-light lg:mt-11 xl:mt-16">
            <h1 className="text-[14px] uppercase font-semibold text-white">
              {header3}
            </h1>
            <div className="text-[14px] mt-1.5 font-normal leading-6 text-custom1">
              <p className="mt-5">{weekdays1}</p>
              <p>{weekdays2}</p>
              <p>{weekdays3}</p>
              <p>{weekdays4}</p>
            </div>
          </div>
          <div className="mt-7 xl:mt-16">
            <h1 className="text-[14px] uppercase font-semibold text-white">
              {offers1}
            </h1>
            <div className="mt-6">
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full h-12 text-[13px] placeholder-[#5F6973] outline-none px-5 rounded-l-lg rounded-r-none xl:h-[52px] focus:ring-transparent border-none"
                  placeholder="Enter your email"
                />
                <button className=" bg-custom2 w-[60px] h-12 rounded-r-lg rounded-l-none text-[13px] text-white font-semibold xl:h-[52px]">
                  Go
                </button>
              </div>
              <p className="text-[14px] text-custom1 font-normal mt-3">
                {offerPara}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 mx-auto max-w-[1220px] md:flex justify-between items-center xl:mt-12">
          <p className="text-[13px] text-custom1 font-normal">
            &copy; {rights}
          </p>
          <div className="flex items-center flex-wrap gap-2 mt-4 text-white md:mt-0">
            {footerIcons.map((item) => {
              return (
                <button
                  key={item.id}
                  className={`${
                    item.icon
                      ? "relative bg-secondary w-[30px] h-[30px] rounded-full hover:bg-white transition-all duration-200 ease-in-out delay-200 group xxl:w-10 xxl:h-10"
                      : "hidden"
                  }`}
                >
                  <div className="text-[18px] absolute inset-1.5 cursor-pointer group-hover:text-primary-text transition-all duration-200 ease-in-out delay-200 xxl:text-[20px] xxl:inset-2.5">
                    {item.icon}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
