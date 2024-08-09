"use client";
import React, { useState } from "react";
import ModalImage from "react-modal-image";
import { getUserRole } from "@/utils/authUtils";
import { useContentMenu } from "../ProfileContentMenuContext";
import TenantContentMenu from "../tenant/tenantContentMenu/TenantContentMenu";
import LandlordContentMenu from "../landlord/landlordContentMenu/LandlordContentMenu";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { HiOutlineMail } from "react-icons/hi";
import { BsPhoneVibrate } from "react-icons/bs";
import { RxArrowTopRight } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import Link from "next/link";
import ProfileSkeleton from "@/components/loader/ProfileSkeleton";

const ProfileContentMenu = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { user, isLoading } = useAuth();
  const { contentMenu, handleContentMenu } = useContentMenu();
  const userRole = getUserRole();

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  const gender = user?.gender;
  const defaultAvatarUrl =
    gender === "Male"
      ? "/assets/images/fallback-profile.webp"
      : "/assets/images/fallback-female-profile.jpeg";
  const avatarUrl = user?.avatar?.secure_url || defaultAvatarUrl;

  return (
    <section className="px-4 mx-auto max-w-[993px] xl:max-w-[1200px] xxl:px-0">
      <div className="flex items-center gap-1.5 text-secondary font-light text-[14px] lg:text-[15px]">
        <Link href="/">
          <h3 className="hover:text-primary-text transition-colors duration-300 ease-in-out">
            Home
          </h3>
        </Link>
        <span className="text-[19px]">
          <RiArrowRightSLine />
        </span>
        <h3
          className="hover:text-primary-text transition-colors duration-300 ease-in-out cursor-pointer"
          onClick={() => handleContentMenu("Personal Info")}
        >
          Account
        </h3>
        <span className="text-[19px]">
          <RiArrowRightSLine />
        </span>
        <h3 className="text-custom2">{contentMenu}</h3>
      </div>
      <div className="w-full mt-7 bg-white rounded-xl shadow-2xl p-5 overflow-hidden md:pt-7">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div className="flex gap-4 flex-wrap">
              <div className="w-[50px] h-[50px] bg-custom4 rounded-full overflow-hidden cursor-pointer">
                <ModalImage
                  small={avatarUrl}
                  large={avatarUrl}
                  alt={`Profile Picture - ${
                    user?.name || "User Profile Picture"
                  }`}
                  hideDownload={true}
                  hideZoom={true}
                />
              </div>
              <div>
                <h1 className="text-base font-semibold text-primary-text md:text-[18px]">
                  {user?.name}
                </h1>
                <span className="flex items-center gap-0.5 text-yellow-500 mt-1.5">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </span>
                <div className="mt-5">
                  <span className="text-base text-secondary font-light flex items-center gap-2 mb-1">
                    <BsPhoneVibrate />
                    <p>{user?.phone_number}</p>
                  </span>
                  <span className="text-base text-secondary font-light flex items-center gap-2">
                    <HiOutlineMail />
                    <p>{user?.email}</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-7">
              {userRole === "LandLord" && (
                <div
                  className="w-full bg-primary-text text-white py-4 font-medium font-poppins rounded-xl flex justify-center hover:bg-custom3 transition-all duration-300 delay-150 ease-in-out cursor-pointer"
                  onClick={() => handleContentMenu("Add New Properties")}
                >
                  <span className="flex items-center gap-2">
                    <h3 className="text-[15px]">Add New Property</h3>
                    <RxArrowTopRight className="text-[22px]" />
                  </span>
                </div>
              )}
              <button
                className="w-full py-2.5 mt-4 font-semibold text-custom2 border-[1px] border-gray-200 rounded-lg hover:bg-gray-100 flex justify-center items-center gap-1.5 transition-colors duration-300 ease-in-out lg:hidden"
                onClick={handleMenu}
              >
                <MdOutlineMenu className="text-[22px]" />
                <span>Menu</span>
              </button>
            </div>
            <div
              className={`${
                !isMenu ? "hidden" : "block"
              } transition-all duration-300 ease-in-out mt-8 lg:block`}
            >
              <div className="w-fill h-[1px] bg-gray-200 mt-5"></div>
              {userRole === "Tenant" ? (
                <div>
                  <TenantContentMenu handleMenu={handleMenu} />
                </div>
              ) : (
                userRole === "LandLord" && (
                  <div>
                    <LandlordContentMenu handleMenu={handleMenu} />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProfileContentMenu;
