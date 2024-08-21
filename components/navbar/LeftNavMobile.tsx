"use client";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/contexts/modalContext/ModalContext";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserRole } from "@/utils/authUtils";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { HiHomeModern } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxArrowTopRight, RxSlash } from "react-icons/rx";
import { navData } from "../data";
import { footerData, footerIcons } from "../data";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick";

const LeftNavMobile = () => {
  const { rights } = footerData;
  const { isLeftNav, setIsLeftNav, handleIsLeftNav } = useModal();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
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
        } fixed top-0 left-0 h-[100dvh] w-[390px] max-w-full bg-white text-primary-text z-50 overflow-y-hidden transition-all duration-500 ease-in-out`}
        ref={modalRef}
      >
        <section>
          <div className="bg-white w-full flex justify-between items-center gap-2 flex-wrap border-b-[1px] py-2.5 px-5">
            <Link href="/" onClick={handleIsLeftNav}>
              <div className="flex items-center gap-2">
                <div className="relative bg-custom2 w-11 h-11 rounded-[40%]">
                  <HiHomeModern className="absolute text-[22px] inset-[11px] text-white" />
                </div>
                <h3 className="text-[20px] font-semibold">
                  pos<span className="text-custom2">H</span>
                  <span className="-ml-2">
                    <span className="text-custom2">H</span>omez
                  </span>
                </h3>
              </div>
            </Link>
            <div
              className="flex items-center gap-1 text-[13px] text-[#E44343] cursor-pointer"
              onClick={handleIsLeftNav}
            >
              <p className="text-sm">Close</p>
              <IoClose className="text-xl" />
            </div>
          </div>
          <div className="px-5 pt-5">
            {!isAuthenticated && (
              <div className="text-[15px] flex justify-between items-center gap-2.5">
                <Link
                  href="/auth/login"
                  onClick={handleIsLeftNav}
                  className="w-full"
                >
                  <button className="w-full py-3 rounded-full border-[1px] border-primary-text hover:bg-primary-text hover:text-white transition-colors duration-300 ease-in-out">
                    Login
                  </button>
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={handleIsLeftNav}
                  className="w-full"
                >
                  <button className="text-white w-full py-3.5 bg-primary-text rounded-full hover:bg-custom3 transition-colors duration-300 ease-in-out">
                    Register
                  </button>
                </Link>
              </div>
            )}
            {isAuthenticated && userRole === "LandLord" && (
              <div className=" text-white text-[15px] bg-primary-text hover:bg-custom3 py-3.5 px-9 inline-block font-medium font-poppins rounded-full hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
                <span className="flex items-center gap-2">
                  <h3>Add Property</h3>
                  <RxArrowTopRight className="text-[18px]" />
                </span>
              </div>
            )}
          </div>
          <article className="font-sans mt-8 space-y-20 text-white">
            {navData.map((item, index) => (
              <Link href={item.link} key={index}>
                <div
                  className="text-base text-primary-text flex items-center group my-1"
                  onClick={handleIsLeftNav}
                >
                  <div
                    className={`${
                      pathname === item.link ? "bg-custom4" : ""
                    } w-full py-4 px-3 mx-3 rounded-lg flex-grow group-hover:bg-custom4 group-hover:py-4 group-hover:px-3 transition-colors duration-300 ease-in-out`}
                  >
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}
          </article>
          <div className="absolute bottom-5 px-4">
            <div className="mt-8 mx-auto max-w-[1220px] ">
              <div className="flex items-center flex-wrap gap-2  text-white">
                {footerIcons.map((item) => {
                  return (
                    <button
                      key={item.id}
                      className="bg-primary-text p-[7px] rounded-full hover:bg-custom13 transition-all duration-300 ease-in-out group"
                    >
                      <div className="text-[24px] cursor-pointer group-hover:text-white transition-all duration-300 ease-in-out">
                        {item.icon}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-[15px] mt-4 text-secondary font-normal">
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
