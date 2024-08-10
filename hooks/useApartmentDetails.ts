"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { PropertyDetails, ApiError } from "@types";
import { getToken } from "@/utils/authUtils";

const fetcher = async (url: string) => {
  try {
    const token = getToken();
    const response = await axios.get<PropertyDetails>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw (error as any).response?.data as ApiError;
  }
};
const apiUrl = process.env.NEXT_PUBLIC_PROPERTY_DETAILS_ENDPOINT;

const useApartmentDetails = () => {
  const { apartmentid } = useParams<{ apartmentid: string | string[] }>();
  const router = useRouter();
  const [propertyUrl, setPropertyUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = Array.isArray(apartmentid) ? apartmentid[0] : apartmentid;
      if (id && apiUrl) {
        setPropertyUrl(`${apiUrl}/property/${id}`);
      } else {
        setPropertyUrl(null);
      }
    }
  }, [apartmentid, apiUrl]);

  const { data, error } = useSWR<PropertyDetails, ApiError>(
    propertyUrl ?? null,
    fetcher
  );

  const handleDetailsClick = (propertyId: string | null) => {
    if (propertyId) {
      router.push(`/listings/apartment-details/${propertyId}`);
    }
  };

  return {
    propertyDetails: data,
    isLoading: !error && !data,
    isError: !!error,
    handleDetailsClick,
  };
};

export default useApartmentDetails;
