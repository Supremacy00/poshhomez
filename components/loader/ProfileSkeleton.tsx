import React from "react";
import { getUserRole } from "@/utils/authUtils";

const ProfileSkeleton = () => {
  const userRole = getUserRole();
  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="bg-gray-300 bg-opacity-40 rounded-full w-[50px] h-[50px] animate-pulse" />
        <div>
          <div className="bg-gray-300 bg-opacity-40 rounded-full w-56 h-4 mb-3 animate-pulse" />
          <div className="bg-gray-300 bg-opacity-40 rounded-full w-24 h-4 animate-pulse" />
        </div>
      </div>
      <div className="bg-gray-300 bg-opacity-40 rounded-lg w-full h-[50px] mt-7 animate-pulse" />
      <div className="bg-gray-300 bg-opacity-40 rounded-lg w-full h-72 mt-5 animate-pulse" />
    </div>
  );
};

export default ProfileSkeleton;
