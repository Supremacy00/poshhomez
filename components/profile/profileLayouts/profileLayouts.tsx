"use client";
import React from "react";
import ProfileMainContent from "./ProfileMainContent";
import ProfileContentMenu from "./ProfileContentMenu";

const ProfileLayout: React.FC = () => {
  return (
      <main className="font-nunito mt-7 pb-24 lg:mt-28 mx-auto max-w-[993px] xl:max-w-[1200px] xxl:px-0 xl:mt-32 lg:flex xl:gap-2 xxl:gap-10">
        <div className="lg:w-[40%] xl:w-[35%] xxl:w-[32%]">
          <ProfileContentMenu />
        </div>
        <div className="lg:w-[60%] lg:mt-14 xl:w-[65%] xxl:w-[68%]">
          <ProfileMainContent />
        </div>
      </main>
  );
};

export default ProfileLayout;
