"use client";
import React, { useRef } from "react";
import { useModal } from "@/contexts/modalContext/ModalContext";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserRole } from "@/utils/authUtils";
import Link from "next/link";
import { TfiClose } from "react-icons/tfi";
import { HiHomeModern } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxArrowTopRight, RxSlash } from "react-icons/rx";
import { navData } from "../data";
import { footerData, footerIcons } from "../data";
import useCloseOnOutsideClick from "@/utils/hooks/useCloseOnOutsideClick";

const LeftNavMobile = () => {
  const { rights } = footerData;
  const { isLeftNav, setIsLeftNav, handleIsLeftNav } = useModal();
  const { isAuthenticated } = useAuth();
  const modalRef = useRef(null);
  const userRole = getUserRole();

  useCloseOnOutsideClick(isLeftNav, () => setIsLeftNav(false), modalRef);

  return (
    <>
      {isLeftNav && (
        <div className="max-w-full fixed right-0 left-0 top-0 h-[100dvh] bg-black bg-opacity-50 flex justify-center z-40 text-primary-text" />
      )}
      <nav
        className={`${
          isLeftNav ? "transform -translate-x-0" : "transform -translate-x-full"
        } font-nunito fixed top-0 left-0 h-[100dvh] w-[430px] max-w-full bg-primary-text text-primary-text z-50 overflow-y-hidden transition-all duration-500 ease-in-out`}
        ref={modalRef}
      >
        <section>
          <div className="bg-white w-full flex justify-between flex-wrap items-center py-2.5 px-5">
            <Link href="/" onClick={handleIsLeftNav}>
              <div className="flex items-center gap-2">
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
            <div
              className="flex items-center gap-2 text-[13px] text-[#E44343] cursor-pointer"
              onClick={handleIsLeftNav}
            >
              <p>Close</p>
              <TfiClose />
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-3 xl:gap-6 text-white text-[15px] mt-6 px-5 ">
            {!isAuthenticated && (
              <div className="flex items-center gap-2">
                <Link href="/auth/login" onClick={handleIsLeftNav}>
                  <span className="flex items-center gap-1.5 cursor-pointer">
                    <IoPersonCircleOutline className="text-[23px]" />
                    <h3 className="font-medium hover:underline underline-offset-2 py-2 -mr-2">
                      Login
                    </h3>
                  </span>
                </Link>
                <span className="flex items-center font-medium cursor-pointer">
                  <RxSlash className="text-lg" />
                  <Link href="/auth/signup" onClick={handleIsLeftNav}>
                    <h3 className="hover:underline underline-offset-2 py-2">
                      Register
                    </h3>
                  </Link>
                </span>
              </div>
            )}
            {isAuthenticated && userRole === "LandLord" && (
              <div className=" bg-white text-primary-text p-3 font-medium font-poppins rounded-lg hover:bg-custom2 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                <span className="flex items-center gap-2">
                  <h3>Add Property</h3>
                  <RxArrowTopRight className="text-[18px]" />
                </span>
              </div>
            )}
          </div>
          <ul className="text-[15px] mt-16 space-y-20  text-white font-medium">
            {navData.map((item, index) => (
              <Link href={item.link} key={index}>
                <div
                  className="flex items-center group"
                  onClick={handleIsLeftNav}
                >
                  <li className="w-full py-4 px-5 flex-grow group-hover:bg-custom2 group-hover:text-custom2 group-hover:bg-opacity-10 group-hover:py-4 group-hover:px-5 transition-colors duration-300 ease-in-out">
                    {item.title}
                  </li>
                  <li className="w-[5px] py-[26.5px] group-hover:bg-custom2 transition-colors duration-300 ease-in-out" />
                </div>
              </Link>
            ))}
          </ul>
          <div className="absolute bottom-5 px-4">
            <div className="mt-8 mx-auto max-w-[1220px] ">
              <div className="flex items-center flex-wrap gap-2  text-white">
                {footerIcons.map((item) => {
                  return (
                    <button
                      key={item.id}
                      className="relative bg-secondary w-[30px] h-[30px] rounded-full hover:bg-white transition-all duration-200 ease-in-out delay-200 group"
                    >
                      <div className="text-[18px] absolute inset-1.5 cursor-pointer group-hover:text-primary-text transition-all duration-200 ease-in-out delay-200">
                        {item.icon}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[15px] mt-4 text-custom1 font-normal">
                &copy; {rights}
              </p>
            </div>
          </div>
        </section>
      </nav>
    </>
  );
};

export default LeftNavMobile;
