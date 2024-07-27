import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useContentMenu } from "../ProfileContentMenuContext";
import { ProfileMenuProps } from "@/@types";
import { BsPerson } from "react-icons/bs";
import { VscLock } from "react-icons/vsc";
import { GoHome } from "react-icons/go";
import { HiOutlineStar } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import Link from "next/link";

const LandlordProfileMenu: React.FC<ProfileMenuProps> = ({
  isOpen,
  userRole,
  handleClick,
}) => {
  const { handleLogout, user } = useAuth();
  const { handleContentMenu } = useContentMenu();
  const formatedUserRole =
    userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase();
  const gender = user?.gender;
  const defaultAvatarUrl =
    gender === "Male"
      ? "/assets/images/fallback-profile.webp"
      : "/assets/images/fallback-female-profile.jpeg";
  const avatarUrl = user?.avatar?.secure_url || defaultAvatarUrl;

  return (
    <section className={`${isOpen ? "py-[25px]" : ""} font-nunito`}>
      <section
        className={`${
          isOpen ? "bg-white w-[270px] shadow-2xl rounded-xl" : ""
        } py-5`}
      >
        <div className="flex items-center gap-2 px-5 ">
          <div className="max-w-[45px] h-[45px] rounded-full overflow-hidden border-[3px] border-gray-300 aspect-4/3">
            <Image
              src={avatarUrl}
              alt={`${user?.name || "User"}'s avatar`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
              layout="responsive"
              objectFit="cover"
              quality={100}
              onError={(e) => {
                e.currentTarget.src = defaultAvatarUrl;
              }}
            />
          </div>
          <div>
            <h1 className="text-base text-primary-text font-medium">
              {user?.name}
            </h1>
            <p className="text-[15px] text-secondary">{formatedUserRole}</p>
          </div>
        </div>
        <div className="w-fill h-[1px] bg-gray-200 mt-4"></div>
        <div className="mt-1.5 px-1 font-medium">
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Personal Info"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out cursor-pointer">
              <BsPerson className="text-[21px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[15px]">Personal Info</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Password & Security"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out  cursor-pointer">
              <VscLock className="text-[20px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[15px]">Password & Security</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("My Properties"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out  cursor-pointer">
              <GoHome className="text-[20px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[15px]">My Properties</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Reviews"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out  cursor-pointer">
              <HiOutlineStar className="text-[21px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[15px]">Reviews</h1>
            </div>
          </Link>
          <Link
            href="/account/profile"
            onClick={() => {
              handleContentMenu("Notifications"), handleClick();
            }}
          >
            <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out  cursor-pointer">
              <GoBell className="text-[20px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[15px]">Notifications</h1>
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
              <div className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg transition-colors duration-300 ease-in-out  cursor-pointer">
                <IoHelpCircleOutline className="text-[21px] text-gray-600 group-hover:text-white transition-colors duration-300 ease-in-out " />
                <h1 className="text-[15px]">Help</h1>
              </div>
            </Link>
            <div
              className="group flex items-center gap-2.5 text-primary-text px-4 py-3 hover:bg-primary-text hover:text-white rounded-lg cursor-pointer transition-colors duration-300 ease-in-out "
              onClick={handleLogout}
            >
              <IoLogOutOutline className="text-[20px] text-custom2 group-hover:text-white transition-colors duration-300 ease-in-out " />
              <h1 className="text-[15px] text-custom2 group-hover:text-white transition-colors duration-300 ease-in-out">
                Sign Out
              </h1>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default LandlordProfileMenu;
