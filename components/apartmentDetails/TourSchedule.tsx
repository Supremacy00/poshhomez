"use client";
import React, { useState } from "react";
import { initializePayment } from "@/service/paystackService";
import { useParams } from "next/navigation";
import { RiDragMoveFill } from "react-icons/ri";
import { toast } from "sonner";
import PrivateRoute from "../privateRoute/PrivateRoute";
import { useAuth } from "@/contexts/authContext/Auth-Context";

const TourSchedule = () => {
  const { apartmentid } = useParams<{ apartmentid: string }>();
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  const handlePayment = async () => {
    if (isAuthenticated) {
      setIsPayment(true);
      if (!apartmentid) {
        toast.error("Property ID not found");
        setIsPayment(false);
        return;
      }
      const paymentData = await initializePayment(apartmentid);
      if (paymentData && paymentData.payment_url) {
        window.location.href = paymentData.payment_url;
      } else {
        setIsPayment(false);
      }
    }
  };

  return (
    <>
      <div className="text-primary-text bg-white rounded-xl lg:sticky top-[95px] p-6 xl:p-8">
        <div>
          <h2 className="text-[20px] font-semibold mb-2">Schedule a tour</h2>
          <p className="text-[15px]">Choose your preferred day</p>
          <div className="flex justify-between items-center gap-1 flex-wrap">
            <button className="text-[13px] font-semibold py-3 px-6 mt-5  border-[1px] border-primary-text rounded-xl bg-custom4 cursor-text ss:px-8 xs:px-10">
              In Person
            </button>
            <PrivateRoute href={`/listings/apartment-details/${apartmentid}`}>
              <button
                disabled={isPayment}
                className={`${
                  isPayment
                    ? "bg-opacity-70"
                    : "bg-opacity-100 hover:bg-custom3"
                } text-[13px] text-white font-semibold py-3.5 px-6 mt-5 bg-primary-text transition-colors duration-300 ease-in-out rounded-xl ss:px-8 xs:px-10`}
                onClick={handlePayment}
              >
                {isPayment ? "Renting..." : "Rent Now"}
              </button>
            </PrivateRoute>
          </div>
        </div>
        <div className="mt-5">
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
            <p className="text-sm">By submitting I agree to Terms of Use.</p>
          </div>
          <div className="w-full mt-8">
            <button className=" w-full py-4 bg-custom2 bg-cus rounded-xl text-white font-medium flex justify-center items-center gap-3 ">
              <span className="text-[15px]">Submit a Tour Request</span>
              <RiDragMoveFill className="text-[22px]" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TourSchedule;
