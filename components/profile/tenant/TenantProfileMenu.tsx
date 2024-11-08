import React, { memo } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useContentMenu } from "../ProfileContentMenuContext";
import { ProfileMenuProps } from "@/@types";
import { BsPerson } from "react-icons/bs";
import { VscLock } from "react-icons/vsc";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineStar } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";

const TenantProfileMenu: React.FC<ProfileMenuProps> = ({
  userRole,
  handleClick,
}) => {
  const { handleLogout, user } = useAuth();
  const { handleContentMenu } = useContentMenu();

  const gender = user?.gender;
  const defaultAvatarUrl =
    gender === "Male"
      ? "/assets/images/fallback-profile.webp"
      : "/assets/images/fallback-female-profile.jpeg";
  const avatarUrl = user?.avatar?.secure_url || defaultAvatarUrl;

  return (
    <section className="py-[25px]">
      <section className="bg-white w-[280px] shadow-2xl rounded-xl py-5 overflow-hidden font-medium">
        {user && (
          <div className="flex items-center gap-2.5 px-5 ">
            <div>
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-custom4 border-[2px] border-gray-300">
                <Avatar
                  alt={user.name}
                  src={avatarUrl}
                  sx={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div>
              <h1 className="text-[15px] text-primary-text font-semibold truncate max-w-[180px] whitespace-nowrap overflow-hidden">
                {user?.name}
              </h1>
              <p className="text-[13.5px] text-secondary font-normal">
                {userRole}
              </p>
            </div>
          </div>
        )}
        <div className="w-full h-[1px] bg-gray-200 mt-4"></div>
        <div className="mt-1.5 px-1 ">
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Personal Info"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2 text-primary-text px-4 py-3  hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
              <BsPerson className="text-[21px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[14.5px]">Personal Info</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Password & Security"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
              <VscLock className="text-[20px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[14.5px]">Password & Security</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Wishlist"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
              <IoIosHeartEmpty className="text-[20px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[14.5px]">Wishlist</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Reviews"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
              <HiOutlineStar className="text-[21px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[14.5px]">Reviews</h1>
            </div>
          </Link>
          <div className="w-fill h-[1px] bg-gray-200 my-1.5"></div>
          <div>
            <Link
              href="/account/profile"
              onClick={() => {
                handleContentMenu("Help"), handleClick();
              }}
            >
              <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
                <IoHelpCircleOutline className="text-[21px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
                <h1 className="text-[14.5px]">Help</h1>
              </div>
            </Link>
            <div
              className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg cursor-pointer transition-colors duration-300 ease-in-out "
              onClick={handleLogout}
            >
              <IoLogOutOutline className="text-[20px] text-custom2 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[14.5px] text-custom2 group-hover:text-white transition-colors duration-300 ease-in-out">
                Sign Out
              </h1>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TenantProfileMenu;
