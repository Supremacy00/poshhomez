"use client";
import React from "react";
import { CiHome } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { useModal } from "@/contexts/modalContext/ModalContext";

const Search: React.FC = () => {
  const { isAdvanceSearch, setIsAdvanceSearch, handleIsAdvanceSearch } =
    useModal();

  return (
    <section className="font-nunito mt-10 xl:max-w-[750px]">
      <div className="w-28 text-center rounded-t-xl bg-white text-sm mt-8">
        <h3 className="border-b-[1px] border-b-custom5 mx-6 py-3.5">Rent</h3>
      </div>
      <div className="w-full bg-white p-5 rounded-tr-xl rounded-b-xl shadow-sm">
        <div className="md:flex justify-between items-center gap-6">
          <div className="relative font-dm w-full">
            <CiHome className="absolute bottom-[37%] left-[17px] z-10 text-base" />
            <input
              type="text"
              name="rent"
              id="rent"
              placeholder="Enter Keyword"
              className="relative w-full py-[16px] px-12 bg-custom4 rounded-xl text-sm placeholder-primary-text outline-none ring-transparent focus:ring-transparent border-0"
            />
          </div>
          <div className="w-full py-[17px] bg-custom4 rounded-xl text-[15px] text-primary-text font-dm mt-4 md:w-[60%] md:mt-0 lg:w-[100%]">
            <span className="flex justify-between items-center px-5 ">
              <p>type</p>
              <IoMdArrowDropdown className="text-lg -mr-1.5" />
            </span>
          </div>
          <div className="flex items-center flex-wrap gap-8 mt-4 px-5 md:mt-0 md:flex-nowrap md:px-0 md:ml-2 lg:ml-14 xl:ml-5">
            <div
              className="flex items-center flex-wrap gap-3.5 cursor-pointer md:flex-nowrap"
              onClick={handleIsAdvanceSearch}
            >
              <VscSettings className="rotate-90 lg:text-[17px]" />
              <h3 className="text-sm font-medium">Advanced</h3>
            </div>
            <button className="p-4 bg-custom2 rounded-xl text-[20px] text-white">
              <CiSearch />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
