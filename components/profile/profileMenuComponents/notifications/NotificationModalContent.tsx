import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaCircle } from "react-icons/fa6";
import { GiAutoRepair } from "react-icons/gi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { RiContractFill } from "react-icons/ri";
import { MdPayments } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { useNotifications } from "@/hooks/useNotifications";
import { timeAgo } from "@/utils/timeformat";

const NotificationModalContent = () => {
  const { notifications, isError, isLoading, markAsRead } = useNotifications();

  type NotificationDetails = {
    icon: JSX.Element;
    title: string;
  };

  const getNotificationDetails = (slug: string): NotificationDetails => {
    switch (slug) {
      case "account":
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
      case "maintenance":
        return {
          icon: <GiAutoRepair className="text-amber-600 text-[25px]" />,
          title: "Maintenance Notice",
        };
      case "alert":
        return {
          icon: <TbAlertTriangleFilled className="text-red-500 text-[25px]" />,
          title: "Alert",
        };
      default:
        return {
          icon: <AiOutlineCheckCircle className="text-gray-500 text-[25px]" />,
          title: "Notification",
        };
    }
  };

  let slug = "agreement";
  let { icon, title } = getNotificationDetails(slug);

  return (
    <section className="grid grid-cols-1 divide-y-[1px]">
      {notifications?.map((notification) => (
        <div
          key={notification.id}
          className="py-3 hover:bg-custom4 cursor-pointer group transition-colors duration-300 ease-in-out"
        >
          <div className="flex gap-3 items-start px-5">
            <div className="">{icon}</div>
            <div>
              <h3 className="text-sm font-medium text-primary-text mb-1">
                {title}
              </h3>
              <div className="flex items-center gap-3">
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
      ))}
    </section>
  );
};

export default NotificationModalContent;
