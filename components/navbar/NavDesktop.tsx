'use client'
import React, { useEffect } from "react";
import { navData } from "../data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiHomeModern } from "react-icons/hi2";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RxArrowTopRight, RxSlash } from "react-icons/rx";
import RightNav from "./RightNav";
import { useModal } from "@/contexts/modalContext/ModalContext";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserRole } from "@/utils/authUtils";
import AuthenticatedNavProfile from "../profile/profileAuth/AuthenticatedNavProfile";
import { useContentMenu } from "../profile/ProfileContentMenuContext";
import { motion, useScroll, useSpring } from "framer-motion"

const NavDesktop = () => {
  const pathname = usePathname();
  const { handleIsRightNav } = useModal();
  const { isAuthenticated } = useAuth();
  const userRole = getUserRole();
  const { handleContentMenu } = useContentMenu();

  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <><motion.div
    className="w-full py-[2px] lg:py-[3px] bg-custom2 fixed top-0 left-0 z-50"
    style={{ scaleX }}
  />
  
      <nav className="bg-white w-full border-b-[1px] border-b-custom4 hidden lg:block fixed right-0 left-0 top-0 text-primary-text z-40 py-5">
        <div className="px-5 mx-auto max-w-[993px] xl:max-w-[1200px] xxl:px-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-12 xl:gap-16">
              <Link href="/">
                <div className="font-semibold flex items-center gap-2">
                  <div className="relative bg-custom2 w-11 h-11 rounded-[40%]">
                    <HiHomeModern className="absolute text-[22px] inset-[11px] text-white" />
                  </div>
                  <h3 className="text-[20px]">
                    pos<span className="text-custom2">H</span>
                    <span className="-ml-2">
                      <span className="text-custom2">H</span>omez
                    </span>
                  </h3>
                </div>
              </Link>
            </div>
            <ul className="flex items-center font-medium space-x-10 text-sm xl:space-x-12">
              {navData.map((item, index) => (
                <Link href={item.link} key={index}>
                  <li
                    className={`${
                      pathname === item.link ? "text-custom2" : ""
                    } py-2 hover:text-custom2 transition-colors duration-500 ease-in-out`}
                  >
                    {item.title}
                  </li>
                </Link>
              ))}
            </ul>
            <div className="flex items-center gap-3 font-medium xl:gap-6">
              {!isAuthenticated && (
                <div className="flex items-center gap-2">
                  <Link href="/auth/login">
                    <span className="flex items-center gap-1.5 cursor-pointer">
                      <IoPersonCircleOutline className="text-[23px]" />
                      <h3 className="hidden xl:block text-sm hover:underline underline-offset-2 py-2 -mr-2">
                        Login
                      </h3>
                    </span>
                  </Link>
                  <span className="hidden xl:flex items-center text-sm cursor-pointer">
                    <RxSlash className="text-lg" />
                    <Link href="/auth/signup">
                      <h3 className="hover:underline underline-offset-2 py-2">
                        Register
                      </h3>
                    </Link>
                  </span>
                </div>
              )}
              {isAuthenticated && userRole === "LandLord" && (
                <Link
                  href="/account/profile"
                  onClick={() => handleContentMenu("Add New Properties")}
                >
                  <div className="bg-primary-text text-white px-6 py-4 font-medium rounded-xl hover:bg-custom3 transition-all duration-300 delay-150 ease-in-out cursor-pointer">
                    <span className="flex items-center gap-2">
                      <h3 className="text-[15px]">Add New Property</h3>
                      <RxArrowTopRight className="text-[22px]" />
                    </span>
                  </div>
                </Link>
              )}
              {isAuthenticated && <AuthenticatedNavProfile />}
              <div
                className="cursor-pointer space-y-2"
                onClick={handleIsRightNav}
              >
                <div className="w-7 h-[1.5px] bg-primary-text rounded-full" />
                <div className="w-5 h-[1.5px] bg-primary-text rounded-full ml-2" />
              </div>
            </div>
          </div>
          <RightNav />
        </div>
      </nav>
      </>
  );
};

export default NavDesktop;
