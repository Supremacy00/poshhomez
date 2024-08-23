"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useNotifications } from "@/hooks/useNotifications";
import { GoBell } from "react-icons/go";
import TenantProfileMenu from "../tenant/TenantProfileMenu";
import { getUserRole } from "@/utils/authUtils";
import LandlordProfileMenu from "../landlord/LandlordProfileMenu";
import NotificationsMenu from "../profileMenuComponents/notifications/NotificationsModal";

const AuthenticatedNavProfile = () => {
  const [isProfileMenu, setIsProfileMenu] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const userRole = getUserRole();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const handleProfileClick = () => {
    setIsProfileMenu((prev) => !prev);
  };

  const handleNotification = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsNotification((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node) &&
      notificationButtonRef.current &&
      !notificationButtonRef.current.contains(event.target as Node)
    ) {
      setIsNotification(false);
    }
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node) &&
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target as Node)
    ) {
      setIsProfileMenu(false);
    }
  };

  useEffect(() => {
    if (isNotification || isProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotification, isProfileMenu]);

  const gender = user?.gender;
  const defaultAvatarUrl =
    gender === "Male"
      ? "/assets/images/fallback-profile.webp"
      : "/assets/images/fallback-female-profile.jpeg";
  const avatarUrl = user?.avatar?.secure_url || defaultAvatarUrl;

  return (
    <nav className="relative flex items-center gap-2 z-40">
      <section
        ref={notificationButtonRef}
        onClick={handleNotification}
        className="relative"
      >
        <div className="relative group hidden lg:block">
          <div className="relative bg-opacity-0 group-hover:bg-opacity-30 p-[25px] bg-gray-300 rounded-full cursor-pointer transition-colors duration-500 ease-in-out"></div>
          <div className="absolute top-[6.5px] left-[6.5px] p-[9px] text-[19px] bg-gray-300 bg-opacity-40 rounded-full cursor-pointer">
            <GoBell />
          </div>
          <span className="absolute top-0 right-0 text-white text-[13px] py-[0.5px] px-[7px] bg-custom2 rounded-full">
            {unreadCount}
          </span>
        </div>
        {isNotification && (
          <motion.div
            ref={notificationRef}
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[31px] lg:top-[43px] right-0 z-50"
            onClick={(event) => event.stopPropagation()}
          >
            <NotificationsMenu />
          </motion.div>
        )}
      </section>
      <section ref={profileButtonRef} className="relative">
        {user && (
          <div
            className="w-[45px] h-[45px] rounded-full overflow-hidden bg-custom4 border-[2px] border-gray-300 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={avatarUrl}
              alt={`${user?.name || "User"}'s avatar`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
              quality={100}
            />
          </div>
        )}
        {isProfileMenu && (
          <motion.div
            ref={profileRef}
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-7 lg:top-10 right-0 z-50"
            onClick={(event) => event.stopPropagation()}
          >
            {userRole === "Tenant" && (
              <TenantProfileMenu
                userRole={userRole}
                handleClick={handleProfileClick}
              />
            )}
            {userRole === "LandLord" && (
              <LandlordProfileMenu
                userRole={userRole}
                handleClick={handleProfileClick}
              />
            )}
          </motion.div>
        )}
      </section>
    </nav>
  );
};

export default AuthenticatedNavProfile;
