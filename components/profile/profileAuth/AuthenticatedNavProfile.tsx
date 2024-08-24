"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useNotifications } from "@/hooks/useNotifications";
import { FaRegBell } from "react-icons/fa";
import TenantProfileMenu from "../tenant/TenantProfileMenu";
import { getUserRole } from "@/utils/authUtils";
import LandlordProfileMenu from "../landlord/LandlordProfileMenu";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsModal from "../profileMenuComponents/notifications/NotificationsModal";

const AuthenticatedNavProfile = () => {
  const [isProfileMenu, setIsProfileMenu] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const userRole = getUserRole();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { unreadCount } = useNotifications();
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const isNotificationsPage = pathname === "/notification";

  const handleProfileClick = () => {
    setIsProfileMenu((prev) => !prev);
  };

  const handleNotification = (event: React.MouseEvent) => {
    if (isNotificationsPage) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setIsNotification((prev) => !prev);
  };

  const handleRegularNotification = () => {
    router.push("/notification");
    setIsNotification(false);
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
    <nav className="relative flex items-center gap-3.5 z-40">
      {/* This is a desktop modal notification section */}
      <section
        ref={notificationButtonRef}
        onClick={handleNotification}
        className={`${
          isNotificationsPage ? " cursor-default" : " cursor-pointer"
        } relative hidden xs:block`}
      >
        <Badge
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              backgroundColor: "#FC6C61",
              top: "6px",
              right: "6px",
              width: "9px",
              height: "9px",
              borderRadius: "50%",
            },
          }}
          invisible={unreadCount === 0}
          className={`bg-custom4 ${
            isNotificationsPage
              ? "hover:bg-custom4"
              : "hover:bg-custom11 transition-colors duration-300 ease-in-out"
          } rounded-full p-2`}
        >
          <FaRegBell className=" text-custom7 text-[22px]" />
        </Badge>
        <AnimatePresence>
          {isNotification && (
            <motion.div
              ref={notificationRef}
              initial={{ opacity: 1, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-7 lg:top-9 right-0 z-50"
              onClick={(event) => event.stopPropagation()}
            >
              <NotificationsModal
                handleRegularNotification={handleRegularNotification}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {/* This is a regular notification section */}
      <section
        onClick={handleRegularNotification}
        className="relative block xs:hidden"
      >
        <Badge
          variant="dot"
          sx={{
            "& .MuiBadge-dot": {
              backgroundColor: "#FC6C61",
              top: "6px",
              right: "6px",
              width: "9px",
              height: "9px",
              borderRadius: "50%",
            },
          }}
          invisible={unreadCount === 0}
          className="cursor-pointer bg-custom4 hover:bg-custom10 rounded-full p-[5px] transition-colors duration-300 ease-in-out"
        >
          <FaRegBell className=" text-custom7 text-[22px]" />
        </Badge>
      </section>
      <section ref={profileButtonRef} className="relative">
        {user && (
          <div
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full overflow-hidden bg-custom4 border-[2px] border-gray-300 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Avatar
              alt={user.name}
              src={avatarUrl}
              sx={{ width: "100%", height: "100%" }}
            />
          </div>
        )}
        <AnimatePresence>
          {isProfileMenu && (
            <motion.div
              ref={profileRef}
              initial={{ opacity: 1, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-7 lg:top-9 right-0 z-50"
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
        </AnimatePresence>
      </section>
    </nav>
  );
};

export default AuthenticatedNavProfile;
