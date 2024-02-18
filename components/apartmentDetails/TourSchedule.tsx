import React from "react";
import { RiDragMoveFill } from "react-icons/ri";

const TourSchedule = () => {
  return (
      <div className="text-primary-text bg-white rounded-xl shadow-2xl p-6 xl:p-8">
        <div>
          <h2 className="text-[20px] font-semibold mb-2">Schedule a tour</h2>
          <p className="text-[15px]">Choose your preferred day</p>
          <button className="text-[13px] font-semibold px-10 py-3 mt-5 border-[1px] border-primary-text rounded-xl bg-custom4 cursor-text">
            In Person
          </button>
        </div>
        <div className="mt-5 font">
          <div className="w-full">
            <input
              type="text"
              name="time"
              id="time"
              placeholder="Time"
              className="w-full py-3.5 px-4 placeholder:text-sm placeholder:text-secondary border-[1px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg"
            />
          </div>
          <div className="w-full mt-5">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full py-3.5 px-4 placeholder:text-sm placeholder:text-secondary border-[1px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg"
            />
          </div>
          <div className="w-full mt-5">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              className="w-full py-3.5 px-4 placeholder:text-sm placeholder:text-secondary border-[1px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg"
            />
          </div>
          <div className="w-full mt-5">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full py-3.5 px-4 placeholder:text-sm placeholder:text-secondary border-[1px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg"
            />
          </div>
          <div className="w-full mt-5">
            <textarea
              name="message"
              id="message"
              placeholder="Enter your message"
              className="w-full h-[150px] px-4 pt-6 placeholder:text-sm placeholder:text-secondary border-[1px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg"
            ></textarea>
          </div>
          <div className="flex items-center gap-2.5 mt-3.5">
            <input
              type="checkbox"
              name=""
              id=""
              className="w-4 h-4 border border-custom10 rounded bg-gray-100 focus:ring-transparent text-primary-text checked:bg-primary-text"
            />
            <p className="text-[15px]">
              By submitting I agree to Terms of Use.
            </p>
          </div>
          <div className="w-full mt-8">
            <button className=" w-full py-4 bg-custom2 bg-cus rounded-xl text-white font-medium flex justify-center items-center gap-3 ">
              <span className="text-[15px]">Submit a Tour Request</span>
              <RiDragMoveFill className="text-[22px]"/>
            </button>
          </div>
        </div>
      </div>
  );
};

export default TourSchedule;
