import React from "react";
import { getUserRole } from "@/utils/authUtils";

const ProfileSkeleton = () => {
    const userRole = getUserRole();
  return (
    <div className="flex items-center gap-8">
        {userRole === "LandLord" && ( <div className="bg-gray-300 bg-opacity-40 w-[182.5px] h-[54.5px] rounded-xl animate-pulse"></div>)}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-5">
          <div className="bg-gray-300 bg-opacity-40 w-9 h-9 rounded-full animate-pulse"></div>
          <div className="bg-gray-300 bg-opacity-40 w-9 h-9 rounded-full animate-pulse"></div>
        </div>
        <div className="bg-gray-300 bg-opacity-40 w-11 h-11 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
