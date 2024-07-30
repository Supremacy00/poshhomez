"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useApiWithSWR from "@/hooks/useApiWithSWR";
import { PropertyCardDetails } from "@/@types";
import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";
import { Tooltip } from "@mui/material";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import {
  MdSensorOccupied,
  MdOutlineLibraryAdd,
  MdOutlineFitScreen,
} from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { FadeLoader } from "react-spinners";
import SkeletonLoader from "../loader/SkeletonLoader";
import WishlistIcon from "../profile/profileMenuComponents/wishlist/WishlistIcon";
import { useWishlist } from "@/contexts/wishlistContext/WishlistContext";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserRole } from "@/utils/authUtils";
import AppPagination from "../AppPagination";
import ListingsSearch from "./ListingsSearch";
import { VscSettings } from "react-icons/vsc";

const Listings: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    limit,
    totalCount,
    currentPage,
    fetchPreviousPage,
    fetchNextPage,
    totalProperties,
  } = useApiWithSWR(process.env.NEXT_PUBLIC_PROPERTY_ENDPOINT || "", 1, {
    defaultLimit: 12,
  });
  const { isAuthenticated } = useAuth();
  const userRole = getUserRole();
  const { addToWishlist, removeFromWishlist, isItemInWishlist, loadingMap } =
    useWishlist();

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

  const rangeStart = (currentPage - 1) * limit + 1;
  const rangeEnd = Math.min(currentPage * limit, totalProperties);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
    <section className="font-nunito bg-custom4 text-primary-text pb-24 pt-12 lg:pt-24 ">
      <div className="mx-auto px-4 xs:max-w-[550px] md:max-w-[768px] md:px-10 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <div className="pt-12 flex justify-between items-center gap-2 flex-wrap">
          <div>
            <h1 className="text-[22px] font-semibold mb-3">
              Poshhomez Houses For Rent
            </h1>
            <div className="flex items-center gap-1.5 text-secondary font-light text-sm lg:text-[15px]">
              <Link href="/">
                <h3 className="hover:text-primary-text transition-colors duration-300 ease-in-out">
                  Home
                </h3>
              </Link>
              <span className="text-[19px]">
                <RiArrowRightSLine />
              </span>
              <h3 className="text-sm">Listings</h3>
              <span className="text-[19px]">
                <RiArrowRightSLine />
              </span>
              <h3 className="text-sm text-custom2">For Rent</h3>
            </div>
          </div>
          <div className="mt-5 lg:hidden">
            <div className="text-sm bg-white py-2.5 px-5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer">
              <VscSettings className="text-[17px]" />
              <h3>Filter</h3>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-16">
          <ListingsSearch />
        </div>
        <article className="mt-10 grid grid-cols-1 xs:grid-cols-2 gap-8 xs:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 lg:mt-8">
          {((isLoading && properties.length === 0) || isError) &&
            Array.from({ length: 12 }).map((_, index) => (
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
                    <div className="relative bg-gray-400 rounded-t-xl overflow-hidden w-full h-full aspect-4/3 xs:h-[180px] md:h-[230px] lg:h-[200px]">
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
                    <div className="absolute bottom-5 left-5 text-primary-text">
                      <h3 className="text-[15px] font-semibold bg-white py-1.5 px-2.5 rounded-md">
                        <span className="text-sm">{`\u20A6 `}</span>
                        {`${formattedAmount(item.rent_fee)} /`}
                        <span className="font-light font-dm ml-1">yr</span>
                      </h3>
                    </div>
                  </div>
                  <div className="text-primary-text p-5 bg-white rounded-b-xl shadow-2xl">
                    <div>
                      <Link href={`/listings/apartment-details/${item.id}`}>
                        <h1 className="text-[15px] font-semibold group-hover:underline group-hover:text-custom2 inline-block cursor-pointer transition-colors duration-300 ease-in-out">
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
                    <div className="flex items-center gap-3 flex-wrap mt-3.5 text-[13px]">
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
                    <div className="w-full h-[1px] bg-custom11 mt-4"></div>
                    <div className="flex justify-between items-center mt-3.5">
                      <h3 className="text-[13px] text-custom2">For Rent</h3>
                      <div className="flex items-center gap-0.5">
                        <Tooltip title="View photos" placement="top" arrow>
                          <span className="px-[10px] py-[10px] rounded-lg cursor-pointer hover:bg-custom4 transition-colors duration-500 ease-in-out">
                            <MdOutlineLibraryAdd />
                          </span>
                        </Tooltip>
                        <Tooltip title="Fit to screen" placement="top" arrow>
                          <span className="px-[9px] py-[9px] rounded-lg cursor-pointer hover:bg-custom4 transition-colors duration-500 ease-in-out">
                            <MdOutlineFitScreen className="text-lg" />
                          </span>
                        </Tooltip>
                        {isAuthenticated && userRole === "Tenant" && (
                          <Tooltip
                            title="Add to favorite"
                            placement="top"
                            arrow
                          >
                            <div
                              className={`${
                                isItemInWishlist(item.id) &&
                                !loadingMap[item.id]
                                  ? "hover:bg-custom4"
                                  : loadingMap[item.id]
                                  ? "bg-primary-text bg-opacity-10"
                                  : "hover:bg-custom4"
                              } relative text-lg w-9 h-9 rounded-lg cursor-pointer transition-colors duration-500 ease-in-out`}
                              onClick={() => handleWishlistClick(item)}
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
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
        </article>
        <AppPagination
          totalCount={totalCount}
          currentPage={currentPage}
          fetchPreviousPage={fetchPreviousPage}
          fetchNextPage={fetchNextPage}
        />
        <div className="text-center text-base mt-4 text-secondary">
        <h3>{`${rangeStart} - ${rangeEnd} of ${totalProperties}+ Apartments Available`}</h3>
        </div>
      </div>
    </section>
  );
};

export default Listings;
