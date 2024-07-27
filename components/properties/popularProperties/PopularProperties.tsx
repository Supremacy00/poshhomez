"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PropertyCardDetails } from "@/@types";
import useApiWithSWR from "@/hooks/useApiWithSWR";
import { useWishlist } from "@/contexts/wishlistContext/WishlistContext";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserRole } from "@/utils/authUtils";
import SkeletonLoader from "../../loader/SkeletonLoader";
import { FadeLoader } from "react-spinners";
import Tooltip from "@mui/material/Tooltip";
import {
  MdSensorOccupied,
  MdOutlineLibraryAdd,
  MdOutlineFitScreen,
} from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
import Link from "next/link";
import WishlistIcon from "../../profile/profileMenuComponents/wishlist/WishlistIcon";

const PopularProperties: React.FC = () => {
  const { data, isLoading, isError } = useApiWithSWR(
    process.env.NEXT_PUBLIC_PROPERTY_ENDPOINT || ""
  );
  const { isAuthenticated } = useAuth();
  const userRole = getUserRole();
  const {
    addToWishlist,
    removeFromWishlist,
    isItemInWishlist,
    loadingMap,
  } = useWishlist();

  const properties: PropertyCardDetails[] = data?.data?.data || [];
  const defaultFallbackUrl = "/assets/images/hero1.jpg";

  const formattedAmount = (price: number | string) => {
    const amountValue = typeof price === "string" ? parseFloat(price) : price;
    const roundedValue = Math.round(amountValue);
    const formattedValue =
      roundedValue % 1 === 0
        ? roundedValue.toLocaleString() + ".00"
        : amountValue.toLocaleString();
    return formattedValue;
  };

  const [debounce, setDebounce] = useState(false);

  // Function to handle wishlist click
  const handleWishlistClick = (item: PropertyCardDetails) => {
    if (debounce) return;
    setDebounce(true);
    setTimeout(() => setDebounce(false), 500);

    if (!loadingMap[item.id]) {
      isItemInWishlist(item.id)
        ? removeFromWishlist(item.id)
        : addToWishlist(item);
    }
  };

  return (
    <section className="mx-auto font-nunito px-4 pb-16 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:py-12 lg:px-5 xl:py-24 xl:max-w-[1200px] xxl:px-0">
      <div className="lg:flex justify-between items-center">
        <div>
          <h1 className="text-[20px] font-semibold text-primary-text sm:text-[30px]">
            Discover Popular Properties
          </h1>
          <p className="text-[15px] mt-1 lg:mt-0">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>
        <h3 className="text-sm text-white inline-block font-dm py-2.5 px-5 rounded-lg mt-8 bg-primary-text lg:mt-0">
          For Rent
        </h3>
      </div>
      <article className="mt-7 grid grid-cols-1 xs:grid-cols-2 gap-8 xs:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 lg:mt-12 ">
        {((isLoading && properties.length === 0) || isError) &&
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        {!isLoading &&
          !isError &&
          properties.map((item) => {
            const photoObject = item.photos?.[1] as { secure_url?: string };
            const imageUrl = photoObject?.secure_url || defaultFallbackUrl;
            return (
              <article key={item.id} className="group">
                <div className="relative overflow-hidden">
                  <div className="relative rounded-md overflow-hidden w-full h-full aspect-4/3 xs:h-[180px] md:h-[250px] lg:h-[220px]">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      width={1000}
                      height={1000}
                      priority
                      className="relative w-full h-full group-hover:scale-110 group-hover:-rotate-1 transition-all duration-500 ease-in-out"
                    />
                  </div>
                  <div
                    className={`${
                      item.is_occupied
                        ? "absolute top-5 left-5 group-hover:top-16 group-hover:opacity-0 transition-all group duration-500 ease-in-out"
                        : "hidden"
                    } text-white bg-custom2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md`}
                  >
                    <MdSensorOccupied className="text-[12px]" />
                    <h3 className="text-[12px] uppercase font-dm font-medium">
                      {item.is_occupied ? "Occupied" : ""}
                    </h3>
                  </div>
                  <div className="absolute -bottom-24 right-5 flex items-center gap-1 text-white group-hover:bottom-5 transition-all duration-500 ease-in-out">
                    {isAuthenticated && userRole === "Tenant" && (
                      <Tooltip title="Add to favorite" placement="top" arrow>
                        <div
                          className={`${
                            isItemInWishlist(item.id) && !loadingMap[item.id]
                              ? "hover:bg-white shadow-3xl"
                              : loadingMap[item.id]
                              ? "hover:bg-custom2"
                              : "hover:bg-custom2"
                          } relative bg-primary-text text-lg bg-opacity-90 w-9 h-9 rounded-lg cursor-pointer  transition-colors duration-500 ease-in-out`}
                          onClick={() => {
                            if (!loadingMap[item.id]) {
                              isItemInWishlist(item.id)
                                ? removeFromWishlist(item.id)
                                : addToWishlist(item);
                            }
                          }}
                        >
                          {loadingMap[item.id] ? (
                            <span className="flex justify-center items-center absolute top-[22px] left-[23px]">
                              <FadeLoader
                                color="#ffffff"
                                height={4}
                                margin={-12}
                                radius={2}
                                width={2}
                              />
                            </span>
                          ) : (
                            <WishlistIcon propertyId={item.id} />
                          )}
                        </div>
                      </Tooltip>
                    )}
                    <Tooltip title="View photos" placement="top" arrow>
                      <span className="bg-primary-text bg-opacity-90 px-[10px] py-[10px] rounded-lg cursor-pointer hover:bg-custom2 transition-colors duration-500 ease-in-out">
                        <MdOutlineLibraryAdd />
                      </span>
                    </Tooltip>
                    <Tooltip title="Fit to screen" placement="top" arrow>
                      <span className="bg-primary-text bg-opacity-90 px-[9px] py-[9px] rounded-lg cursor-pointer hover:bg-custom2 transition-colors duration-500 ease-in-out">
                        <MdOutlineFitScreen className="text-lg" />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className="font-poppins text-primary-text mt-5">
                  <h3 className="text-[15px] font-semibold">
                    <span className="text-14">{`\u20A6 `}</span>
                    {`${formattedAmount(item.rent_fee)} /`}
                    <span className="font-light font-dm ml-1">yr</span>
                  </h3>
                  <div className="mt-2">
                    <Link href={`/listings/apartment-details/${item.id}`}>
                      <h1 className="text-[15px] font-semibold group-hover:text-custom2 inline-block cursor-pointer transition-colors duration-300 ease-in-out">
                        {item.name}
                      </h1>
                    </Link>
                  </div>
                  <span className="flex gap-1.5 text-[13.5px] ">
                    <p className="font-dm text-secondary font-light mt-1">
                      {`${item.location?.city} City,`}
                    </p>
                    <p className="font-dm text-secondary font-light mt-1">
                      {`${item.location?.state},`}
                    </p>
                    <p className="font-dm text-secondary uppercase font-light mt-1">
                      {item.location?.country}
                    </p>
                  </span>
                  <div className="flex items-center gap-3 flex-wrap mt-1 text-[13px]">
                    <span className="flex items-center gap-1.5">
                      <IoBedOutline className="text-custom5 text-[15px]" />
                      <p>{`${item.description?.bathroom_count} bed`}</p>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <LiaBathSolid className="text-custom5 text-[15px]" />
                      <p>{`${item.description?.bedroom_count} bath`}</p>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <TbRulerMeasure className="text-custom5" />
                      <p>{`1000 sqft`}</p>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
      </article>
      <section className="flex justify-center mt-14">
        <Link href="/listings">
          <div className="flex items-center gap-3 group cursor-pointer">
            <p className="text-sm text-primary-text font-semibold group-hover:text-custom2 transition-colors delay-100 duration-200 ease-in-out">
              See All Listings
            </p>
            <div className="relative bg-custom2 w-7 h-7 rounded-full group-hover:bg-primary-text transition-colors delay-100 duration-200 ease-in-out">
              <BsPlusLg className="absolute inset-1.5 text-[16px] text-white" />
            </div>
          </div>
        </Link>
      </section>
    </section>
  );
};

export default PopularProperties;
