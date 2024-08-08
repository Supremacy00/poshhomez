"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
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
    console.error("Error fetching data:", error); // Log error details
    throw (error as any).response?.data as ApiError;
  }
};

const apiUrl = process.env.NEXT_PUBLIC_PROPERTY_DETAILS_ENDPOINT;

const useApartmentDetails = (propertyId: string | null) => {
  const [propertyUrl, setPropertyUrl] = useState<string | null>(null);

  useEffect(() => {
    if (propertyId && apiUrl) {
      setPropertyUrl(`${apiUrl}/property/${propertyId}`);
    } else {
      setPropertyUrl(null);
    }
  }, [propertyId, apiUrl]);

  const { data, error } = useSWR<PropertyDetails, ApiError>(
    propertyUrl ?? null, // Use null to prevent SWR from fetching if URL is undefined
    fetcher
  );

  return {
    propertyDetails: data,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useApartmentDetails;
