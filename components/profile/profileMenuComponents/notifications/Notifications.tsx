"use client";
import React from "react";
import Image from "next/image";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationLoader from "@/components/loader/NotificationLoader";
import NotificationContent from "./NotificationContent";

const Notifications = () => {
  const { notifications, isError, isLoading, markAsRead } = useNotifications();

  return (
    <div className="pt-20 pb-16 lg:pt-28">
      <div className="mx-auto max-w-[690px] bg-white shadow-2xl overflow-hidden border-[1px] border-gray-200 sm:rounded-xl">
        <div className="flex justify-between items-center gap-1.5 flex-wrap px-5 pt-4">
          <h1 className="text-base text-primary-text font-medium xs:text-[20px]">
            Notifications
          </h1>
          {notifications && (
            <div className="flex items-center gap-1 whitespace-nowrap text-custom6 hover:text-custom2 transition-colors duration-300 ease-in-out">
              <IoCheckmarkDoneSharp className="text-lg" />
              <button className="text-[13.5px] font-medium">
                Mark all as read
              </button>
            </div>
          )}
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
        {isLoading ? (
          <div className="px-5 py-5 space-y-5">
            {Array(5).fill(<NotificationLoader />)}
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center text-custom6 text-sm my-10">
            Error loading notifications
          </div>
        ) : notifications && notifications.length > 0 ? (
          <NotificationContent />
        ) : (
          <section className="mx-auto flex flex-col justify-center items-center text-center my-8">
            <div className="w-20 h-20 overflow-hidden rounded-full bg-custom8">
              <Image
                src="/assets/icons/notification.png"
                priority
                alt="No notifications"
                width={100}
                height={100}
                className="w-full h-full object-cover p-2"
              />
            </div>
            <h3 className="text-sm font-medium text-primary-text mt-2">
              No notifications yet
            </h3>
            <p className="w-[280px] text-[13px] text-custom5 font-normal leading-[22px] mt-1">
              You currently do not have any notifications at this moment.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Notifications;
