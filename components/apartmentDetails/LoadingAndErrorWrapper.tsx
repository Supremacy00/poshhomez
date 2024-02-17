import React, { ReactNode } from "react";
import PageLoader from "../loader/PageLoader";
import { PropertyDetails } from "@/@types";

interface PropertyDetailsWrapperProps {
  propertyDetails: PropertyDetails | null | undefined;
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
}

const LoadingAndErrorWrapper: React.FC<PropertyDetailsWrapperProps> = ({
  propertyDetails,
  isLoading,
  isError,
  children,
}) => {
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !propertyDetails?.data) {
    return <div>Error loading property details.</div>;
  }

  return children;
};

export default LoadingAndErrorWrapper;
