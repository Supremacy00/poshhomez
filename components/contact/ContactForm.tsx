import React from "react";
import { MdOutlinePersonOutline } from "react-icons/md";
import { RiTimerLine } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { footerIcons } from "../data";

const ContactForm = () => {
  return (
    <form className="bg-white rounded-xl px-5 py-12  xl:px-12 xl:py-16">
      <div className="sm:flex items-center gap-5">
        <div className="relative w-full">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className="w-full py-[15.5px] pl-4 pr-[45px] mb-5 placeholder:text-sm text-sm placeholder:text-secondary border-0 bg-custom4 focus:ring-0 rounded-lg sm:mb-0"
          />
          <span className="absolute top-[20%] right-4 text-secondary text-[23px] sm:top-[27%]">
            <MdOutlinePersonOutline />
          </span>
        </div>
        <div className="relative w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full py-[15.5px] pl-4 pr-[45px] placeholder:text-sm text-sm placeholder:text-secondary border-0 bg-custom4 focus:ring-0 rounded-lg"
          />
          <span className="absolute top-[31%] right-4 text-secondary text-[20px]">
            <MdAlternateEmail />
          </span>
        </div>
      </div>
      <div className="sm:flex items-center gap-5 mt-7">
        <div className="relative w-full">
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Phone"
            className="w-full py-[15.5px] pl-4 pr-[45px] mb-5 placeholder:text-sm text-sm placeholder:text-secondary border-0 bg-custom4 focus:ring-0 rounded-lg sm:mb-0"
          />
          <span className="absolute top-[23%] right-4 text-secondary text-[20px] sm:top-[31%]">
            <FiPhone />
          </span>
        </div>
        <div className="relative w-full">
          <input
            type="text"
            name="time"
            id="time"
            placeholder="Time"
            className="w-full py-[15.5px] pl-4 pr-[45px] placeholder:text-sm text-sm placeholder:text-secondary border-0 bg-custom4 focus:ring-0 rounded-lg"
          />
          <span className="absolute top-[31%] right-4 text-secondary text-[20px]">
            <RiTimerLine />
          </span>
        </div>
      </div>
      <div className="w-full mt-5">
        <textarea
          name="text"
          id="message"
          placeholder="Enter your message"
          className="w-full h-[180px] px-4 pt-6 mt-5 placeholder:text-sm text-sm resize-none placeholder:text-secondary border-0 bg-custom4 focus:ring-0 rounded-lg"
        ></textarea>
      </div>
      <div className="flex flex-col justify-center items-center xs:flex-row xs:justify-between gap-2 mt-7">
        <button className="text-sm  w-full text-white font-normal bg-custom6 py-3.5 rounded-lg hover:bg-custom2 transition-colors duration-300 ease-in-out xs:text-[12.5px] xs:py-3 xs:w-auto xs:px-7">
          Send Message
        </button>
        <div className="flex items-center flex-wrap gap-2 mt-4 text-white xs:mt-0">
          {footerIcons.map((item) => {
            return (
              <button
                key={item.id}
                className={`${
                  item.icon
                    ? "bg-primary-text p-1.5 rounded-full hover:bg-custom13 transition-all duration-300 ease-in-out group xs:p-1"
                    : "hidden"
                }`}
              >
                <div className="text-[22px] cursor-pointer group-hover:text-white transition-all duration-300 ease-in-out">
                  {item.icon}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
