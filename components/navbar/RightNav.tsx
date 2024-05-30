import React, { useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { TiSocialFacebook, TiSocialLinkedin } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick";
import { useModal } from "@/contexts/modalContext/ModalContext";

const RightNav: React.FC = () => {

  const { isRightNav, setIsRightNav, handleIsRightNav } = useModal();
  const modalRef = useRef(null);

  useCloseOnOutsideClick(isRightNav, () => setIsRightNav(false), modalRef);


  return (
    <article
      className={`${
        isRightNav ? "visible" : "invisible"
      } font-nunito mx-auto w-full fixed right-0 left-0 top-0 bottom-0 inset-0 bg-black bg-opacity-50 flex justify-center z-40 text-primary-text transition-opacity duration-75 ease-in-out`}
    >
      <nav
        className={`${
          isRightNav ? "transform translate-x-0" : "transform translate-x-full"
        } absolute top-0 right-0 h-[100dvh] w-[400px] bg-white text-primary-text z-50 overflow-y-hidden transition-all duration-700 ease-in-out`}
        ref={modalRef}
      >
        <div>
          <div className="flex justify-between items-center gap-5 px-8 py-[27px] border-b-[1px] border-b-gray-300">
            <h1 className="text-[20px] font-semibold">Welcome to PoshHomez</h1>
            <span
              className="relative w-10 h-10 bg-custom4 rounded-full cursor-pointer hover:bg-gray-200 transition-colors duration-300 ease-in-out"
              onClick={handleIsRightNav}
            >
              <LiaTimesSolid className="text-[15px] absolute inset-3" />
            </span>
          </div>
          <ul className="mt-16 text-[14px] font-semibold ">
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              Apartments
            </li>
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              Bungalow
            </li>
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              Houses
            </li>
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              Loft
            </li>
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              Office
            </li>
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              TownHome
            </li>
            <li className="w-full py-4 px-8 hover:bg-custom2 hover:text-custom2 hover:bg-opacity-10 hover:border-l-2 hover:border-l-custom2 hover:py-4 hover:px-[30px] transition-colors duration-200 ease-in-out cursor-pointer">
              Villa
            </li>
          </ul>
          <div className="absolute bottom-0 left-0 right-0" ref={modalRef}>
            <div className="flex justify-between items-center font-dm  py-10 px-8 border-t-[1px] border-b-[1px] border-gray-300">
              <div>
                <h3 className="text-[14px] font-light font-dm mb-5">
                  Total Free Customer Care
                </h3>
                <h4 className="text-[15px] font-semibold no-underline hover:text-custom2 cursor-pointer transition-colors duration-200 delay-100 ease-in-out ">
                  +(0) 123 050 945 02
                </h4>
              </div>
              <div>
                <h3 className="text-[14px] font-light font-dm mb-5">
                  Nee Live Support?
                </h3>
                <h4 className="text-[15px] font-semibold no-underline hover:text-custom2 cursor-pointer transition-colors duration-200 delay-100 ease-in-out">
                  hi@poshHomez.com
                </h4>
              </div>
            </div>
            <div className="m-8 flex items-center gap-5">
              <h3 className="text-[15px] font-semibold">Follow us</h3>
              <div className="flex items-center gap-3">
                <TiSocialFacebook className="text-[20px] hover:text-custom2 cursor-pointer transition-colors duration-200 delay-100 ease-in-out"/>
                <FaXTwitter className="text-[14px] hover:text-custom2 cursor-pointer transition-colors duration-200 delay-100 ease-in-out"/>
                <IoLogoInstagram className="text-[16px] hover:text-custom2 cursor-pointer transition-colors duration-200 delay-100 ease-in-out"/>
                <TiSocialLinkedin className="text-[22px] hover:text-custom2 cursor-pointer transition-colors duration-200 delay-100 ease-in-out"/>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </article>
  );
};

export default RightNav;
