'use client'
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { PropertyDetails, ApiError } from '@types';

const fetcher = async (url: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<PropertyDetails>(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw (error as any).response?.data as ApiError;
    }
  };
  
const useApartmentDetails = (propertyId: string | undefined) => {
  const [propertyUrl, setPropertyUrl] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_PROPERTY_DETAILS_ENDPOINT;
    if (propertyId) {
      setPropertyUrl(`${apiUrl}/property/${propertyId}`);
    }
  }, [propertyId]);

  const { data, error } = useSWR<PropertyDetails, ApiError>(propertyUrl, fetcher);


  return {
    propertyDetails: data,
    isLoading: !error && !data,
    isError: !!error
  };
};

export default useApartmentDetails;
