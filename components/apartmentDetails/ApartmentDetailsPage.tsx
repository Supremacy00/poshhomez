"use client";
import React from "react";
import useFetchApartmentDetails from "@/utils/hooks/useFetchApartmentDetails";
import PageLoader from "../loader/PageLoader";
import ApartmentPhotoCarousel from "./ApartmentPhotoCarousel";
import { formatDistanceToNow } from "date-fns";
import { AiFillClockCircle, AiFillHeart } from "react-icons/ai";
import { MdFitScreen } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxOpenInNewWindow } from "react-icons/rx";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoPrintOutline } from "react-icons/io5";
import { RxSlash } from "react-icons/rx";
import DetailsLayout from "./DetailsLayout";

const ApartmentDetailsPage = () => {
  const { propertyDetails, isLoading, isError } = useFetchApartmentDetails();

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !propertyDetails?.data) {
    return <div>Error loading property details.</div>;
  }

  const {
    name,
    address,
    photos,
    rent_fee,
    created_at,
  } = propertyDetails?.data;

  const timeAgo = (dateString: any) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formattedAmount = (price: number | string) => {
    const amountValue = typeof price === "string" ? parseFloat(price) : price;
    const roundedValue = Math.round(amountValue);
    const formattedValue =
      roundedValue % 1 === 0
        ? roundedValue.toLocaleString() + ".00"
        : amountValue.toLocaleString();
    return formattedValue;
  };

  return (
    <section className="relative font-nunito">
      <div className="relative">
        <ApartmentPhotoCarousel photos={photos} name={name} />
        <header className="text-primary-text px-4 mt-8 mx-auto max-w-[993px] xl:max-w-[1200px] lg:flex justify-between xl:text-white xl:absolute xl:bottom-7 right-0 left-0 xxl:px-0 xxl:bottom-10 ">
          <div>
            <h2 className="text-[25px] font-semibold xs:text-[30px]">{name}</h2>
            <p className="text-[15px] mt-1.5">{address}</p>
            <div className="flex items-center gap-2.5 flex-wrap text-[15px] mt-4 -ml-[5px]">
              <div className="flex items-center gap-1 text-custom2 py-0.5 pr-2.5 border-r-[1.5px] border-custom11">
                <GoDotFill className="text-[20px]" />
                <p>For rent</p>
              </div>
              <div className="flex items-center gap-1 py-0.5 pr-2.5 border-r-[1.5px] border-custom11">
                <AiFillClockCircle className="text-[17px]" />
                <p>{timeAgo(created_at)}</p>
              </div>
              <div className="flex items-center gap-1">
                <MdFitScreen className="text-[21px]" />
                <p>8721</p>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:text-end">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="p-2 text-[18px] border-[1px] border-custom11 rounded-md inline-block xl:border-white">
                <IoMdHeartEmpty />
              </span>
              <span className="p-2 text-[18px] border-[1px] border-custom11 rounded-md inline-block xl:border-white">
                <RxOpenInNewWindow />
              </span>
              <span className="p-2 text-[18px] border-[1px] border-custom11 rounded-md inline-block xl:border-white">
                <IoShareSocialOutline />
              </span>
              <span className="p-2 text-[18px] border-[1px] border-custom11 rounded-md inline-block xl:border-white">
                <IoPrintOutline />
              </span>
            </div>
            <div className="mt-2.5 lg:mt-4 lg:flex flex-col">
              <h3 className="text-[26px] font-semibold">
                <span className="text-[24px]">{`\u20A6 `}</span>
                {formattedAmount(rent_fee)}
              </h3>
              <h3 className="text-[15px] flex items-center mt-0.5 lg:mt-1.5 lg:justify-end">
                <span>
                  {`\u20A6`}
                  {"2,300"}
                </span>
                <span>
                  <RxSlash />
                </span>
                <span className="font-light font-dm">sq ft</span>
              </h3>
            </div>
          </div>
        </header>
      </div>
      <div className="px-3 mt-12 mx-auto max-w-[993px] ss:px-5 xl:max-w-[1200px] xxl:px-0">
        <DetailsLayout />
      </div>
    </section>
  );
};

export default ApartmentDetailsPage;
