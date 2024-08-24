import React from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNotifications } from "@/hooks/useNotifications";
import Image from "next/image";
import NotificationLoader from "@/components/loader/NotificationLoader";
import NotificationContent from "./NotificationContent";
import Link from "next/link";

type NotificationsModalProps = {
  handleRegularNotification: () => void;
};

const NotificationsModal: React.FC<NotificationsModalProps> = ({handleRegularNotification}) => {
  const { notifications, isError, isLoading, markAsRead } = useNotifications();

  const handleMarkAllAsRead = () => {
    if (notifications) {
      notifications.forEach((notification) => markAsRead(notification.id));
    }
  };

  return (
    <section className="py-[25px]">
      <div className="bg-white w-[450px] max-h-[470px] py-3 shadow-2xl rounded-xl overflow-hidden font-normal">
        <div className="flex justify-between items-center px-5">
          <h1 className="text-base text-primary-text font-medium">
            Notifications
          </h1>
          {notifications && notifications.length > 0 && (
            <div className="flex items-center gap-1 text-custom6 hover:text-custom2 transition-colors duration-300 ease-in-out">
              <IoCheckmarkDoneSharp className="text-lg" />
              <button className="text-[13.5px] font-medium">
                Mark all as read
              </button>
            </div>
          )}
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-3"></div>
        {isLoading ? (
          <div className="px-5 mt-3">
            <NotificationLoader />
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center text-custom6 text-sm my-3">
            Error loading notifications
          </div>
        ) : notifications && notifications.length > 0 ? (
          <section className="overflow-y-auto max-h-[370px]">
            <NotificationContent style="line-clamp-2"/>
          </section>
        ) : (
          <section className="mx-auto flex flex-col justify-center items-center text-center my-3">
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
        {notifications && notifications.length > 0 && (
          <>
            <div className="w-full h-[1px] bg-gray-200 grid"></div>
            <button onClick={handleRegularNotification} className="text-[13.5px] font-medium text-custom6 mt-3 px-5">
              View all notifications
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default NotificationsModal;
