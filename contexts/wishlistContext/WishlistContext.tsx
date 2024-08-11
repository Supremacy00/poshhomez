"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import axios from "axios";
import { WishlistContextType } from "@/@types";
import { PropertyCardDetails } from "@/@types";
import { getUserId } from "@/utils/authUtils";
import { getUserRole } from "@/utils/authUtils";
import { toast } from "sonner";
import { getToken } from "@/utils/authUtils";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userId = getUserId();
  const userRole = getUserRole();
  const [wishlist, setWishlist] = useState<PropertyCardDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMap, setLoadingMap] = useState<{ [itemId: string]: boolean }>(
    {}
  );

  const addToWishlist = async (property: PropertyCardDetails) => {
    const itemId = property.id;
    setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [itemId]: true }));

    const isAlreadyAdded = wishlist.some((item) => item.id === property.id);
    if (isAlreadyAdded) {
      toast.info("Item already added to your wishlist.");
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [itemId]: false,
      }));
      return;
    }

    const addFavoritesUrl = `${process.env.NEXT_PUBLIC_ADD_FAVORITES_ENDPOINT}/${userId}/?product_id=${property.id}`;
    const token = getToken();
    if (!token) {
      console.error("No token found");
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [itemId]: false,
      }));
      return;
    }

    try {
      await axios.put(
        addFavoritesUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setWishlist((currentWishlist) => [...currentWishlist, property]);
      toast.success("Apartment added to your wishlist successfully!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      toast.error("Failed to add item to wishlist.");
    } finally {
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [itemId]: false,
      }));
    }
  };

  const removeFromWishlist = async (propertyId: string) => {
    setLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [propertyId]: true,
    }));
    const removeFavoritesUrl = `${process.env.NEXT_PUBLIC_REMOVE_FAVORITES_ENDPOINT}/${userId}/?product_id=${propertyId}`;
    const token = getToken();
    if (!token) {
      console.error("No token found");
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [propertyId]: false,
      }));
      return;
    }

    try {
      const response = await axios.put(
        removeFavoritesUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status_code === 200) {
        setWishlist((currentWishlist) =>
          currentWishlist?.filter((item) => item?.id !== propertyId)
        );
        toast.info("Apartment removed from your wishlist successfully!");
      } else {
        console.error(
          "Failed to remove from wishlist - Unexpected response status:",
          response.status
        );
        toast.error("Failed to remove item from wishlist.");
      }
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
      toast.error("Failed to remove item from wishlist.");
    } finally {
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [propertyId]: false,
      }));
    }
  };

  const fetchWishlistDetails = async () => {
    setLoading(true);
    const token = getToken();

    if (!token || userRole !== "Tenant") {
      setLoading(false);
      return;
    }

    try {
      const { data: userData } = await axios.get(
        `${API_URL}/auth/get_current_user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const propertyDetailsPromises = userData.favorites.map(
        (propertyId: string) =>
          axios.get(`${API_URL}/api/property/${propertyId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
      );

      const propertiesResponses = await Promise.all(propertyDetailsPromises);
      const detailedProperties: PropertyCardDetails[] = propertiesResponses.map(
        (response) => response?.data?.data
      );

      setWishlist(detailedProperties);
    } catch (error) {
      console.error("Error fetching wishlist details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token && userRole === "Tenant") {
      fetchWishlistDetails();
    } else {
      setWishlist([]);
    }
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      loadingMap,
      loading,
    }),
    [wishlist, loadingMap, loading]
  );
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
