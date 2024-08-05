import React, { useState, useEffect } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useWishlist } from "@/contexts/wishlistContext/WishlistContext";
import { PropertyCardDetails } from "@/@types";

interface WishlistButtonProps {
  property: PropertyCardDetails;
  bgColor: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ property, bgColor }) => {
  const { addToWishlist, removeFromWishlist, wishlist, loadingMap } =
    useWishlist();
  const [localIsFavorite, setLocalIsFavorite] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    // Check if the property is in the wishlist
    const isFavorite = wishlist.some((item) => item.id === property.id);
    setLocalIsFavorite(isFavorite);
  }, [property.id, wishlist]);

  const handleFavoriteClick = async () => {
    if (isProcessing) return;

    const newFavoriteStatus = !localIsFavorite;
    setLocalIsFavorite(newFavoriteStatus);
    setIsProcessing(true);

    try {
      if (newFavoriteStatus) {
        await addToWishlist(property);
      } else {
        await removeFromWishlist(property.id);
      }
    } catch (error) {
      // Rollback on failure
      setLocalIsFavorite(!newFavoriteStatus);
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      disabled={isProcessing || loadingMap[property.id]}
      className={`${localIsFavorite ? 'bg-white hover:bg-white' : 'bg-custom2 hover:bg-custom2'} text-lg p-[9px] rounded-lg cursor-pointer transition-colors duration-500 ease-in-out`}
      style={{backgroundColor: bgColor, }}
    >
      {localIsFavorite ? (
        <IoMdHeart className="text-red-500" />
      ) : (
        <IoMdHeartEmpty />
      )}
    </button>
  );
};

export default WishlistButton;
