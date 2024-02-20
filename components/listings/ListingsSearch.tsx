import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxSlash } from "react-icons/rx";
import { VscSettings } from "react-icons/vsc";

const ListingsSearch = () => {
  return (
    <section className="xl:flex justify-center items-center xl:justify-between">
      <ul className="hidden text-sm lg:flex lg:justify-center items-center gap-3 xl:flex xl:justify-start">
        <li className="bg-white py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer">
          <h3>For Rent</h3>
          <MdKeyboardArrowDown className="text-[22px]" />
        </li>
        <li className="bg-white py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer">
          <span className="text-sm flex items-center">
            <h3 className="">Beds</h3>
            <RxSlash className="text-base" />
            <h3>Baths</h3>
          </span>
          <MdKeyboardArrowDown className="text-[22px]" />
        </li>
        <li className="bg-white py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer">
          <h3>Price</h3>
          <MdKeyboardArrowDown className="text-[22px]" />
        </li>
        <li className="bg-white py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer">
          <VscSettings className="text-[17px]" />
          <h3>More Filter</h3>
        </li>
      </ul>
      <div className="flex justify-center items-center gap-2 mt-8 xl:mt-0">
        <h3 className="text-sm text-secondary font-light">Sort By</h3>
        <span className="flex items-center">
          <h3 className="text-base">Newest</h3>
          <IoMdArrowDropdown className="text-lg" />
        </span>
      </div>
    </section>
  );
};

export default ListingsSearch;
