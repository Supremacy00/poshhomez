"use client";
import React, { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
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
  style,
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
    ]
      .filter(Boolean)
      .join(" ");
  };

  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = async () => {
    if (!localIsFavorite) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 50);
    }
    await handleFavoriteClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing || loading}
      className={`${className} ${localIsFavorite ? style : ""}`}
    >
      {localIsFavorite ? (
        <GoHeartFill
          className={`text-red-600 transition-transform duration-300 ease-in-out ${
            isBouncing ? "transform scale-150" : ""
          }`}
        />
      ) : (
        <GoHeart className={getIconColorClass()} />
      )}
    </button>
  );
};

export default WishlistButton;
