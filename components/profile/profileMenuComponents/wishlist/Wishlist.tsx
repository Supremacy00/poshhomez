import React from "react";
import { useWishlist } from "@/contexts/wishlistContext/WishlistContext";
import EmptyWishlist from "./EmptyWishlist";
import { MdSensorOccupied } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoMdHeart } from "react-icons/io";

const formatCurrency = (rent_fee: number) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(rent_fee);
};

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[22px] font-semibold text-primary-text lg:text-[28px]">
          Wishlist
        </h1>
        <div className="flex items-center gap-1 text-sm text-custom2 cursor-pointer">
          <CgClose className="text-lg"/>
          <h4>Clear all</h4>
        </div>
      </div>
      {wishlist?.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {wishlist?.map((item) => {
            const photoObject = item?.photos?.[1] as { secure_url?: string };
            const imageUrl =
              photoObject?.secure_url || "/assets/images/hero1.jpg";
            return (
              <div
                key={item?.id}
                className="relative z-10 bg-white rounded-xl overflow-hidden xs:flex items-center gap-2"
              >
                <div className="relative w-full xs:w-[40%]">
                  <div className="w-full p-3.5 aspect-150/80 xs:aspect-80/80 sm:h-[200px] ">
                    <Image
                      src={imageUrl}
                      alt={item?.name || "Wishlist Property"}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div
                    className={`${
                      item?.is_occupied
                        ? "absolute top-5 left-5 group-hover:top-16 group-hover:opacity-0 transition-all group duration-500 ease-in-out"
                        : "hidden"
                    } text-white bg-custom2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-md`}
                  >
                    <MdSensorOccupied className="text-[12px]" />
                    <h3 className="text-[12px] uppercase font-dm font-medium">
                      {item?.is_occupied ? "Occupied" : ""}
                    </h3>
                  </div>
                  <span className="absolute top-5 right-5 bg-white p-1.5 rounded-full">
                    <IoMdHeart className="text-[20px] text-custom2" />
                  </span>
                </div>
                <div className="w-full p-5 xs:w-[60%] xs:px-5 ">
                  <div className="flex justify-between items-center cursor-pointer">
                    <p className="text-[11px] mb-[1.5px] text-custom2 font-normal">
                      FOR RENT
                    </p>
                    <FaTrashAlt className="text-[17px] text-custom2" onClick={() => removeFromWishlist(item.id)}/>
                  </div>
                  <div>
                    <Link
                      key={item?.id}
                      href={`/listings/apartment-details/${item?.id}`}
                    >
                      <h1 className="text-[15px] font-medium hover:text-custom2 inline-block cursor-pointer transition-colors duration-300 ease-in-out">
                        {item?.name}
                      </h1>
                    </Link>
                  </div>
                  <span className="flex gap-1.5 text-[13.5px] text-secondary mt-1.5">
                    <p className="font-dm font-light ">
                      {`${item?.location?.city || "Zaria"} City,`}
                    </p>
                    <p className="font-d font-light">
                      {`${item?.location?.state || "KD"},`}
                    </p>
                    <p className="font-dm uppercase font-light">
                      {item?.location?.country || "NG"}
                    </p>
                  </span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <HiOutlineCash className="text-[23px] text-secondary" />
                    <h3 className="text-[15px] font-medium text-primary-text">
                      {item?.rent_fee !== undefined
                        ? formatCurrency(item.rent_fee)
                        : formatCurrency(0.0)}
                    </h3>
                  </div>
                  <div className="w-full h-[1px] bg-custom11 mt-4"></div>
                  <div className="flex justify-center items-center mt-3 xs:justify-start">
                    <div className="flex items-center gap-3 flex-wrap mt-1 text-[13px] font-light lg:gap-4">
                      <span className="flex items-center gap-1.5">
                        <IoBedOutline className="text-[21px] text-secondary" />
                        <p className="text-primary-text">{`${
                          item?.description?.bathroom_count || 0
                        } bed`}</p>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <LiaBathSolid className="text-[21px] text-secondary" />
                        <p className="text-primary-text">{`${
                          item?.description?.bedroom_count || 0
                        } bath`}</p>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TbRulerMeasure className="text-[19px] text-secondary" />
                        <p className="text-primary-text">{`1000 sqft`}</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
