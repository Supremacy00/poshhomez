'use client'
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { setApartmentId } from '@/redux/slices/apartmentSlice';

const useFetchApartmentId = () => {
  const dispatch = useDispatch();
  const { apartmentid } = useParams<{ apartmentid: string | string[] }>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = Array.isArray(apartmentid) ? apartmentid[0] : apartmentid;
      if (id) {
        dispatch(setApartmentId(id));
      } else {
        console.error("Apartment ID is undefined or null");
      }
    }
  }, [apartmentid, dispatch]);

  return null;
};

export default useFetchApartmentId;
