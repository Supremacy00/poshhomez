import React from "react";
import { useWishlist } from "@/contexts/wishlistContext/WishlistContext";
import EmptyWishlist from "./EmptyWishlist";
import { MdSensorOccupied } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { TbRulerMeasure } from "react-icons/tb";
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
  const { wishlist } = useWishlist();
  console.log(wishlist);

  return (
    <section>
      <h1 className="text-[22px] font-semibold text-primary-text mb-4">
        Wishlist
      </h1>
      {wishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {wishlist.map((item) => {
            const photoObject = item.photos?.[1] as { secure_url?: string };
            const imageUrl = photoObject?.secure_url || "";
            return (
              <div
                key={item.id}
                className="relative z-10 bg-white shadow-2xl rounded-xl overflow-hidden xs:flex items-center gap-2"
              >
                <div className="relative w-full">
                  <div className="w-full aspect-150/80 xs:aspect-100/80 sm:h-[200px] ">
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
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
                  <span className="absolute top-5 right-5 bg-white bg-opacity-50 p-1.5 rounded-full">
                    <IoMdHeart className="text-[20px] text-custom2" />
                  </span>
                </div>
                <div className="w-full p-5">
                  <p className="text-sm mb-[1px] text-custom2">For Rent</p>
                  <div>
                    <Link
                      key={item.id}
                      href={`/poshhomez/listings/apartment-details/${item.id}`}
                    >
                      <h1 className="text-[15px] font-semibold hover:text-custom2 inline-block cursor-pointer transition-colors duration-300 ease-in-out">
                        {item.name}
                      </h1>
                    </Link>
                  </div>
                  <span className="flex gap-1.5 text-[13.5px] text-secondary mt-1.5">
                    <p className="font-dm font-light ">
                      {`${item.location?.city} City,`}
                    </p>
                    <p className="font-d font-light">
                      {`${item.location?.state},`}
                    </p>
                    <p className="font-dm uppercase font-light">
                      {item.location?.country}
                    </p>
                  </span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <HiOutlineCash className="text-[23px] text-secondary" />
                    <h3 className="text-[15px] font-semibold text-primary-text">
                      {item.rent_fee !== undefined
                        ? formatCurrency(item.rent_fee)
                        : "N/A"}
                    </h3>
                  </div>
                  <div className="w-full h-[1px] bg-custom11 mt-4"></div>
                  <div className="flex justify-center items-center mt-3 xs:justify-start">
                    <div className="flex items-center gap-3 flex-wrap mt-1 text-[13px] font-light lg:gap-4">
                      <span className="flex items-center gap-1.5">
                        <IoBedOutline className="text-[21px] text-secondary" />
                        <p className="text-primary-text text-sm">{`${item.description?.bathroom_count} bed`}</p>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <LiaBathSolid className="text-[21px] text-secondary" />
                        <p className="text-primary-text text-sm">{`${item.description?.bedroom_count} bath`}</p>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TbRulerMeasure className="text-[19px] text-secondary" />
                        <p className="text-primary-text text-sm">{`1000 sqft`}</p>
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
