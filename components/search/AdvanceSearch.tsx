"use client";
import React, { useRef, useState } from "react";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick";
import { useModal } from "@/contexts/modalContext/ModalContext";
import { LiaTimesSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";

const AdvanceSearch: React.FC = () => {
  const [gender, setGender] = useState("Male");
  const [isGender, setIsGender] = useState(false);
  const { isAdvanceSearch, setIsAdvanceSearch} =
    useModal();
  const modalRef = useRef(null);
  const genderRef = useRef(null)

  const handleIsGender = () => {
    setIsGender(!isGender);
  };

  const handleIsAdvanceSearch = () => {
    setIsAdvanceSearch(false)
    setIsGender(false)
  }

  const handleGenderStatus = (status: string) => {
    setGender(status);
    setIsGender(false)
  };

  useCloseOnOutsideClick(
    isAdvanceSearch,
    () => {setIsAdvanceSearch(false),
    setIsGender(false)},
    modalRef, genderRef
  );

  useCloseOnOutsideClick(
    isGender,
    () => setIsGender(false),
    genderRef
  );

  return (
    <section
      className={`${
        isAdvanceSearch ? "visible" : "invisible"
      } font-nunito mx-auto w-full fixed right-0 left-0 top-0 bottom-0 inset-0 bg-black bg-opacity-50 flex justify-center z-40 text-primary-text`}
    >
      <div className="relative top-0  w-[650px] px-4">
        <div
          className={`${
            isAdvanceSearch
              ? "transform translate-y-10"
              : " transform -translate-y-full"
          } bg-white overflow-y-auto rounded-xl transition-all duration-500 ease-in-out`}
          ref={modalRef}
        >
          <div className="flex justify-between items-center p-6 border-b-[1px] border-b-custom11">
            <h3 className="text-[18px] font-semibold">More Filter</h3>
            <span
              className="p-2.5 bg-gray-300 bg-opacity-20 rounded-full cursor-pointer hover:bg-opacity-30 transition-colors duration-300 ease-in-out"
              onClick={handleIsAdvanceSearch}
            >
              <LiaTimesSolid className="text-[20px]" />
            </span>
          </div>
          <div className="py-5">
            <div className="xs:flex justify-between items-center gap-6 px-6">
              <div
                className="relative w-full mb-8 xs:mb-0"
              >
                <h3 className="text-[15px] font-semibold mb-3.5">Gender</h3>
                <div className="relative cursor-pointer" onClick={handleIsGender}>
                  <div className="relative border-[1px] border-custom11 rounded-lg py-3 px-4 overflow-hidden">
                    <p className="text-[14px]">{gender}</p>
                  </div>
                  <span className="absolute right-1.5 top-0 pr-2 border-l-[1px] border-custom11 py-[15px] ">
                    <IoMdArrowDropdown className="ml-3 overflow-hidden" />
                  </span>
                </div>
                <div
                  className={`${
                    isGender ? "visible" : "invisible"
                  } absolute w-full border-[1px] border-custom11 bg-white rounded-lg mt-0.5  py-2 text-[14px]`}
                  ref={genderRef}
                >
                  <p
                    className={`${
                      gender === "Male"
                        ? "bg-custom8 py-2.5 px-4"
                        : "py-2.5 px-4"
                    } cursor-pointer`}
                    onClick={() => handleGenderStatus("Male")}
                  >
                    Male
                  </p>
                  <p
                    className={`${
                      gender === "Female"
                        ? "bg-custom8 py-2.5 px-4"
                        : "py-2.5 px-4"
                    } cursor-pointer`}
                    onClick={() => handleGenderStatus("Female")}
                  >
                    Female
                  </p>
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-[15px] font-semibold mb-3.5">
                  Property ID
                </h3>
                <input
                  type="text"
                  name="property_id"
                  id="property_id"
                  className="w-full border-[1px] border-custom11 rounded-lg py-2.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvanceSearch;
