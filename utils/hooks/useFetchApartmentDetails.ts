'use client'
import { useApartmentId } from '@/contexts/apartmentIDContext/ApartmentIdContext';
import useApartmentDetails from './useApartmentDetails';

const useFetchApartmentDetails = () => {
  const apartmentId = useApartmentId();
  const propertyDetails = useApartmentDetails(apartmentId);
  return propertyDetails;
};

export default useFetchApartmentDetails;
