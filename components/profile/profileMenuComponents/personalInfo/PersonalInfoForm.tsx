import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import useUserProfile from "@/utils/hooks/useUserProfile";

const PersonalInfoForm = () => {
  const {
    fullName,
    email,
    phoneNumber,
    address,
    editFullName,
    setEditFullName,
    editEmail,
    setEditEmail,
    editPhoneNumber,
    setEditPhoneNumber,
    editAddress,
    setEditAddress,
    editModes,
    toggleFieldEditMode,
    updateUserData,
  } = useUserProfile();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ fullName, email, phoneNumber, address });
  };

  return (
    <section className="relative border-[1px] border-custom11 rounded-lg mt-5 p-4">
      <form onSubmit={handleSubmit}>
        <div>
          <div className={`${editModes.fullName ? "h-[157px]" : "ss:h-[80px]"} text-primary-text relative pb-4 border-b-[1px] border-t-0 border-l-0 border-r-0 border-custom11 overflow-hidden transition-all duration-500 ease-in-out`}>
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h1 className="text-base font-semibold">Full Name</h1>
                <h3 className={`${editModes.fullName ? "text-custom2" : " text-primary-text"} mt-5 ml-4 whitespace-nowrap font line-clamp-1 transition-colors duration-300 ease-in-out cursor-pointer`} onClick={() => toggleFieldEditMode('fullName')}>
                  {fullName}
                </h3>
              </div>
              <FaRegEdit className="text-[25px] text-gray-600 cursor-pointer" onClick={() => toggleFieldEditMode('fullName')}/>
            </div>
            <div className="px-4 mt-7">
              <input
                type="text"
                value={editFullName}
                onChange={(e) => setEditFullName(e.target.value)}
                className="w-full py-2.5 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg outline-none"
              />
            </div>
          </div>
          <div className={`${editModes.email ? "h-[157px]" : "ss:h-[80px]"} text-primary-text relative pb-4 mt-4 border-b-[1px] border-t-0 border-l-0 border-r-0 border-custo11 overflow-hidden transition-all duration-500 ease-in-out`}>
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h1 className="text-base font-semibold">Email</h1>
                <h3 className={`${editModes.email ? "text-custom2" : " text-primary-text"} mt-5 ml-4 transition-colors duration-300 ease-in-out cursor-pointer`} onClick={() => toggleFieldEditMode('email')}>
                  {email}
                </h3>
              </div>
              <FaRegEdit className="text-[25px] text-gray-600  cursor-pointer" onClick={() => toggleFieldEditMode('email')}/>
            </div>
            <div className="px-4 mt-7">
              <input
                type="text"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full py-2.5 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg outline-none"
              />
            </div>
          </div>
          <div className={`${editModes.phoneNumber ? "h-[157px]" : "ss:h-[80px]"} text-primary-text relative pb-4 mt-4 border-b-[1px] border-t-0 border-l-0 border-r-0 border-custo11 overflow-hidden transition-all duration-500 ease-in-out`}>
            <div className="flex justify-between items-center flex-wrap">
              <div>
                <h1 className="text-base font-semibold">Phone Number</h1>
                <h3 className={`${editModes.phoneNumber ? "text-custom2" : " text-primary-text"} mt-5 ml-4 line-clamp-1 transition-colors duration-300 ease-in-out cursor-pointer`} onClick={() => toggleFieldEditMode('phoneNumber')}>
                  {phoneNumber}
                </h3>
              </div>
              <FaRegEdit className="text-[25px] text-gray-600  cursor-pointer" onClick={() => toggleFieldEditMode('phoneNumber')}/>
            </div>
            <div className="px-4 mt-7">
              <input
                type="text"
                value={editPhoneNumber}
                onChange={(e) => setEditPhoneNumber(e.target.value)}
                className="w-full py-2.5 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PersonalInfoForm;
