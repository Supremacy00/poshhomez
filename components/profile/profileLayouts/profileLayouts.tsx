"use client";
import React from "react";
import ProfileMainContent from "./ProfileMainContent";
import ProfileContentMenu from "./ProfileContentMenu";

const ProfileLayout: React.FC = () => {
  return (
    <main className="w-full bg-custom4 pt-24 pb-16 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[993px] xl:max-w-[1200px] xxl:px-0 lg:flex xl:gap-2 xxl:gap-10">
        <div className="lg:w-[40%] xl:w-[35%] xxl:w-[32%]">
          <ProfileContentMenu />
        </div>
        <div className="lg:w-[60%] lg:mt-14 xl:w-[65%] xxl:w-[68%]">
          <ProfileMainContent />
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
