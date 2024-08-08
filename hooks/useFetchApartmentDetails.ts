import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useApartmentDetails from "@/hooks/useApartmentDetails";

const useFetchApartmentDetails = () => {
  const apartmentId = useSelector((state: RootState) => state.apartment.apartmentId);
  const { propertyDetails, isLoading, isError } = useApartmentDetails(apartmentId);
  return { propertyDetails, isLoading, isError };
};

export default useFetchApartmentDetails;
