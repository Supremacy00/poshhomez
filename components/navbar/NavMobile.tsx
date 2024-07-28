"use client";
import React from "react";
import { HiHomeModern } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useModal } from "@/contexts/modalContext/ModalContext";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import LeftNavMobile from "./LeftNavMobile";
import Link from "next/link";
import AuthenticatedNavProfile from "../profile/profileAuth/AuthenticatedNavProfile";

const NavMobile = () => {
  const { handleIsLoginModal, handleIsLeftNav, isLeftNav, setIsLeftNav } =
    useModal();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="px-4 py-2.5 fixed right-0 left-0 lg:hidden bg-white z-40 shadow-sm">
      <div className="flex justify-between items-center flex-wrap text-primary-text">
        <div className="cursor-pointer" onClick={handleIsLeftNav}>
          <div className="w-7 h-[1.5px] bg-primary-text rounded-full mb-2" />
          <div className="w-5 h-[1.5px] bg-primary-text rounded-full" />
        </div>
        <Link href="/">
          <div className="flex items-center flex-wrap gap-2">
            <div className="relative bg-custom2 w-11 h-11 rounded-[40%]">
              <HiHomeModern className="absolute text-[22px] inset-[11px] text-white" />
            </div>
            <h3 className="text-[20px] font-sans font-semibold">
              pos<span className="text-custom2">H</span>
              <span className="-ml-2">
                <span className="text-custom2">H</span>omez
              </span>
            </h3>
          </div>
        </Link>
        {!isAuthenticated ? (
          <div>
            <IoPersonCircleOutline
              className="text-[23px] hover:text-custom3 transition-all duration-300 delay-150 ease-in-out cursor-pointer"
              onClick={handleIsLoginModal}
            />
          </div>
        ) : (
          <AuthenticatedNavProfile />
        )}
      </div>
      <LeftNavMobile />
    </nav>
  );
};

export default NavMobile;
