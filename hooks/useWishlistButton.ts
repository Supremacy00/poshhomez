import { useState, useEffect } from "react";
import { useWishlist } from "@/contexts/wishlistContext/WishlistContext";
import { PropertyCardDetails } from "@/@types";

interface UseWishlistButtonProps {
  property: PropertyCardDetails;
}

const useWishlistButton = ({ property }: UseWishlistButtonProps) => {
  const { addToWishlist, removeFromWishlist, wishlist, loadingMap } = useWishlist();
  const [localIsFavorite, setLocalIsFavorite] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const isFavorite = wishlist.some((item) => item?.id === property?.id);
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
      setLocalIsFavorite(false);
      console.error("Failed to update wishlist:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    localIsFavorite,
    isProcessing,
    loading: loadingMap[property.id],
    handleFavoriteClick,
  };
};

export default useWishlistButton;
