"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useContentMenu } from "../ProfileContentMenuContext";
import { useNotifications } from "@/hooks/useNotifications";
import { GoBell } from "react-icons/go";
import { HiOutlineEnvelope } from "react-icons/hi2";
import Link from "next/link";
import TenantProfileMenu from "../tenant/TenantProfileMenu";
import { getUserRole } from "@/utils/authUtils";
import LandlordProfileMenu from "../landlord/LandlordProfileMenu";

const AuthenticatedNavProfile = () => {
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const userRole = getUserRole();
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const { handleContentMenu } = useContentMenu();
  const showProfileMenu = () => setIsProfileMenu(true);
  const hideProfileMenu = () => setIsProfileMenu(false);
  const controls = useAnimation();

  const handleClick = () => {
    setIsProfileMenu(!isProfileMenu);
  };

  const gender = user?.gender;
  const defaultAvatarUrl =
    gender === "Male"
      ? "/assets/images/fallback-profile.webp"
      : "/assets/images/fallback-female-profile.jpeg";
  const avatarUrl = user?.avatar?.secure_url || defaultAvatarUrl;

  return (
    <nav className="relative flex items-center gap-2 z-40">
      <div className="relative group hidden lg:block">
        <div className="relative bg-opacity-0 group-hover:bg-opacity-30 p-[25px] bg-gray-300 rounded-full cursor-pointer transition-colors duration-500 ease-in-out"></div>
        <div className="absolute top-[6.5px] left-[6.5px] p-[9px] text-[19px] bg-gray-300 bg-opacity-40 rounded-full cursor-pointer">
          <HiOutlineEnvelope />
        </div>
        <span className="absolute top-0 right-0 text-white text-[13px] py-[0.5px] px-[7px] bg-custom6 rounded-full">
          0
        </span>
      </div>
      <Link
        href="/account/profile"
        onClick={() => handleContentMenu("Notifications")}
      >
        <div className="relative group hidden lg:block">
          <div className="relative bg-opacity-0 group-hover:bg-opacity-30 p-[25px] bg-gray-300 rounded-full cursor-pointer transition-colors duration-500 ease-in-out"></div>
          <div className="absolute top-[6.5px] left-[6.5px] p-[9px] text-[19px] bg-gray-300 bg-opacity-40 rounded-full cursor-pointer">
            <GoBell />
          </div>
          <span className="absolute top-0 right-0 text-white text-[13px] py-[0.5px] px-[7px] bg-custom6 rounded-full">
            {unreadCount}
          </span>
        </div>
      </Link>
      <div
        className="relative"
        onMouseEnter={showProfileMenu}
        onMouseLeave={hideProfileMenu}
      >
        <div
          className="w-[45px] h-[45px] rounded-full overflow-hidden border-[3px] border-gray-300 cursor-pointer"
          onClick={handleClick}
        >
          <Image
            src={avatarUrl}
            alt={`${user?.name || "User"}'s avatar`}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        {isProfileMenu && (
          <>
            {userRole === "Tenant" && (
              <motion.div
                initial={{ opacity: 1, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-7 lg:top-10 right-0 z-50"
              >
                <TenantProfileMenu
                  isOpen={isProfileMenu}
                  userRole={userRole}
                  handleClick={handleClick}
                />
              </motion.div>
            )}
            {userRole === "LandLord" && (
              <motion.div
                initial={{ opacity: 1, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-7 lg:top-10 right-0 z-50"
              >
                <LandlordProfileMenu
                  isOpen={isProfileMenu}
                  userRole={userRole}
                  handleClick={handleClick}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default AuthenticatedNavProfile;
