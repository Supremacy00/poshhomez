"use client";
import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import useWishlistButton from "@/hooks/useWishlistButton";
import { PropertyCardDetails } from "@/@types";

interface WishlistButtonProps {
  property: PropertyCardDetails;
  size?: number;
  iconColor?: {
    base?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  className?: string;
  style?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  property,
  size,
  iconColor = {},
  className,
  style
}) => {
  const { localIsFavorite, isProcessing, loading, handleFavoriteClick } =
    useWishlistButton({ property });

  const getIconColorClass = () => {
    const { base, sm, md, lg, xl } = iconColor;
    return [
      base,
      sm ? `sm:${sm}` : "",
      md ? `md:${md}` : "",
      lg ? `lg:${lg}` : "",
      xl ? `xl:${xl}` : "",
    ].filter(Boolean).join(" ");
  };

  return (
    <button
      onClick={handleFavoriteClick}
      disabled={isProcessing || loading}
      className={`${className} ${localIsFavorite ? style : ""}`}
    >
      {localIsFavorite ? (
        <IoMdHeart className={`text-red-600 transition-transform scale-125 duration-300 ease-in-out`} />
      ) : (
        <IoMdHeartEmpty className={getIconColorClass()} />
      )}
    </button>
  );
};

export default WishlistButton;
