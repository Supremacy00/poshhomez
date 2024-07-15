import React, { useState } from "react";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useContentMenu } from "../../ProfileContentMenuContext";
import { ContentHandleMenuProps } from "@/@types";
import { BsPerson } from "react-icons/bs";
import { VscLock } from "react-icons/vsc";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineStar } from "react-icons/hi2";
import { GoBell } from "react-icons/go";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const LandlordContentMenu: React.FC <ContentHandleMenuProps> = ({handleMenu}) => {
  const { handleLogout } = useAuth();
  const { contentMenu, handleContentMenu } = useContentMenu();


  return (
    <div className="mt-2 space-y-0.5 font-roboto">
      <div
        className={`${
          contentMenu === "Personal Info" ? "bg-primary-text text-white " : ""
        } group flex items-center text-primary-text hover:bg-primary-text hover:text-white gap-2.5 px-4 py-3.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer`}
        onClick={() => {handleContentMenu("Personal Info"), handleMenu()}}
      >
        <BsPerson className={`${contentMenu === 'Personal Info' ? "text-white" : "text-secondary" } text-[21px] group-hover:text-white transition-colors duration-300 ease-in-out`} />
        <h1 className="text-base">Personal Info</h1>
      </div>
      <div
        className={`${
          contentMenu === "Password & Security"
            ? "bg-primary-text text-white"
            : ""
        } group flex items-center text-primary-text hover:bg-primary-text hover:text-white  gap-3 px-4 py-3.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer`}
        onClick={() => {handleContentMenu("Password & Security"), handleMenu()}}
      >
        <VscLock className={`${contentMenu === 'Password & Security' ? "text-white" : "text-secondary" } text-[20px] group-hover:text-white transition-colors duration-300 ease-in-out`} />
        <h1 className="text-base">Password & Security</h1>
      </div>
      <div
        className={`${
          contentMenu === "My Properties" ? "bg-primary-text text-white" : ""
        } group flex items-center text-primary-text hover:bg-primary-text hover:text-white  gap-3 px-4 py-3.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer`}
        onClick={() => {handleContentMenu("My Properties"), handleMenu()}}
      >
        <IoIosHeartEmpty className={`${contentMenu === 'My Properties' ? "text-white" : "text-secondary" } text-[20px] group-hover:text-white transition-colors duration-300 ease-in-out`} />
        <h1 className="text-base">My Properties</h1>
      </div>
      <div
        className={`${
          contentMenu === "Reviews" ? "bg-primary-text text-white " : ""
        } group flex items-center text-primary-text hover:bg-primary-text hover:text-white gap-3 px-4 py-3.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer`}
        onClick={() => {handleContentMenu("Reviews"), handleMenu()}}
      >
        <HiOutlineStar className={`${contentMenu === 'Reviews' ? "text-white" : "text-secondary" } text-[21.5px] group-hover:text-white transition-colors duration-300 ease-in-out`} />
        <h1 className="text-base">Reviews</h1>
      </div>
      <div
        className={`${
          contentMenu === "Notifications" ? "bg-primary-text text-white " : ""
        } group flex items-center text-primary-text hover:bg-primary-text hover:text-white gap-3 px-4 py-3.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer`}
        onClick={() => {handleContentMenu("Notifications"), handleMenu()}}
      >
        <GoBell className={`${contentMenu === 'Notifications' ? "text-white" : "text-secondary" } text-[19px] group-hover:text-white transition-colors duration-300 ease-in-out`} />
        <h1 className="text-base">Notifications</h1>
      </div>
      <div className="w-fill h-[1px] bg-gray-200 my-3"></div>
      <div className="space-y-0.5">
        <div
          className={`${
            contentMenu === "Help" ? "bg-primary-text text-white" : ""
          } group flex items-center text-primary-text hover:bg-primary-text hover:text-white  gap-3 px-4 py-3.5 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer`}
          onClick={() => {handleContentMenu("Help"), handleMenu()}}
        >
          <IoHelpCircleOutline className={`${contentMenu === 'Help' ? "text-white" : "text-secondary" } text-[21px] group-hover:text-white transition-colors duration-300 ease-in-out`} />
          <h1 className="text-base">Help</h1>
        </div>
        <div
          className="group flex items-center gap-3 text-primary-text px-4 py-3.5 hover:bg-primary-text hover:text-white rounded-lg cursor-pointer transition-colors duration-300 ease-in-out "
          onClick={handleLogout}
        >
          <IoLogOutOutline className="text-[20px] text-custom2 group-hover:text-white transition-colors duration-300 ease-in-out " />
          <h1 className="text-base text-custom2 group-hover:text-white transition-colors duration-300 ease-in-out">Sign Out</h1>
        </div>
      </div>
    </div>
  );
};

export default LandlordContentMenu;
