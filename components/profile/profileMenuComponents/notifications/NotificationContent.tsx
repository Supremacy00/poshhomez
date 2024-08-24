'use client'
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FaCircle } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { RiContractFill } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { useNotifications } from "@/hooks/useNotifications";
import { timeAgo } from "@/utils/timeformat";

const NotificationContent = () => {
  const { notifications } = useNotifications();

  type NotificationDetails = {
    icon: JSX.Element;
    title: string;
  };

  const getNotificationDetails = (slug: string): NotificationDetails => {
    switch (slug) {
      case "notice":
        return {
          icon: <BiSolidUserAccount className="text-gray-500 text-[25px]" />,
          title: "Account Update",
        };
      case "payment":
        return {
          icon: <MdPayments className="text-blue-500 text-[25px]" />,
          title: "Payment Confirmation",
        };
      case "agreement":
        return {
          icon: <RiContractFill className=" text-teal-800 text-[25px]" />,
          title: "Agreement Update",
        };
      case "registration":
        return {
          icon: <AiOutlineCheckCircle className="text-green-500 text-[25px]" />,
          title: "Registration Successful",
        };
      default:
        return {
          icon: <FaBell className="text-gray-500 text-[20px]" />,
          title: "Important Notice",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 divide-y-[1px] divide-gray-200">
      {notifications?.map((notification) => {
        const { icon, title } = getNotificationDetails(notification.slug || notification.none);
        return (
          <div
            key={notification.id}
            className="py-3 hover:bg-custom4 cursor-pointer group transition-colors duration-300 ease-in-out"
          >
            <div className="flex gap-3 items-start px-5">
              <div className="">{icon}</div>
              <div className="w-full">
                <h3 className="text-sm font-medium text-primary-text mb-1">
                  {title}
                </h3>
                <div className="flex justify-between items-center gap-3">
                  <p className="text-[13px] text-custom5 font-normal line-clamp-2 leading-[22px] mb-1.5">
                    {notification.content}
                  </p>
                  <div
                    className={`${
                      notification.is_read === "False" ? "visible" : "hidden"
                    }`}
                  >
                    <FaCircle className="text-[9px] text-custom6" />
                  </div>
                </div>
                <p className="text-[13px] font-normal text-[#7788a1]">
                  {timeAgo(notification.created_at)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationContent;
