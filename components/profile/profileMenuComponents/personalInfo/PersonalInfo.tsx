'use client'
import React from "react";
import UserFileUploader from "../fileUploader/UserFileUploader";
import PersonalInfoForm from "./PersonalInfoForm";

const PersonalInfo = () => {
  return (
    <section className="font-noto">
      <div>
        <h1 className="text-[22px] font-semibold text-primary-text">
          Personal Info
        </h1>
        <div className="mt-4">
          <h3 className="text-base text-secondary font-light font-dm">
            Your personal info is 50% completed
          </h3>
          <div className="relative w-full mt-2">
            <div className="relative w-full bg-custom11 py-[2.5px] rounded-full"></div>
            <div className="absolute top-0 w-[50%] bg-amber-400 py-[2.5px] rounded-l-full"></div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-primary-text text-base mb-1.5 ">Short bio</h4>
        <div className="xs:flex items-center gap-3">
            <textarea
              name="Bio"
              id="Bio"
              placeholder="Write your bio here. It will be displayed on your public profile."
              className="w-full p-4 h-40 text-[15px] font-light placeholder:text-base placeholder-secondary rounded-lg border-custom11 outline-none"
            ></textarea>
          <div>
            <UserFileUploader />
          </div>
        </div>
      </div>
        <div>
        <PersonalInfoForm />
        </div>
    </section>
  );
};

export default PersonalInfo;
