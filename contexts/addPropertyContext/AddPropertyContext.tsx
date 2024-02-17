import React, { createContext, useContext, useState, ReactNode } from "react";
import axios, { CancelTokenSource } from "axios";
import { AddPropertyDetails, AddPropertyAmenities } from "@/@types";
import { toast } from "react-toastify";

interface LoadingState {
  details: boolean;
  photos: boolean;
  amenities: boolean;
}

interface ErrorState {
  details: Error | null;
  photos: Error | null;
  amenities: Error | null;
}

interface SubmissionStatus {
  details: boolean;
  photos: boolean;
  amenities: boolean;
}

interface PropertyContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  submitPropertyDetails: (details: AddPropertyDetails) => Promise<void>;
  uploadPhotos: (photos: File[], propertyId: string) => Promise<void>;
  addAmenities: (
    amenities: AddPropertyAmenities,
    propertyId: string
  ) => Promise<void>;
  propertyId: string | null;
  loading: LoadingState;
  error: ErrorState;
  submissionStatus: SubmissionStatus;
  handleSkip: () => void;
  handleNext: () => void; 
}

export const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
);

export const usePropertyContext = (): PropertyContextType => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error(
      "usePropertyContext must be used within a PropertyProvider"
    );
  }
  return context;
};

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    details: false,
    photos: false,
    amenities: false,
  });
  const [error, setError] = useState<ErrorState>({
    details: null,
    photos: null,
    amenities: null,
  });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    details: false,
    photos: false,
    amenities: false,
  });

  const handleSkip = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleAxiosRequest = async (
    requestFunc: (cancelToken: CancelTokenSource) => Promise<any>,
    type: keyof LoadingState
  ) => {
    let cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
    setLoading((prev) => ({ ...prev, [type]: true }));
    setError((prev) => ({ ...prev, [type]: null }));

    try {
      const response = await requestFunc(cancelTokenSource);
      setSubmissionStatus((prev) => ({ ...prev, [type]: true }));
      return response;
    } catch (error) {
      if (!axios.isCancel(error)) {
        setError((prev) => ({ ...prev, [type]: error as Error }));
      }
      throw error;
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
      cancelTokenSource.cancel(
        "Operation canceled due to component unmounting or new request."
      );
    }
  };

  const submitPropertyDetails = async (details: AddPropertyDetails) => {
    return handleAxiosRequest(
      (cancelToken) =>
        axios.post(`${apiUrl}/api/property/list`, details, {
          headers: { Authorization: `Bearer ${getToken()}` },
          cancelToken: cancelToken.token,
        }),
      "details"
    )
    .then((response) => {
      if (response.data.status_code === 201) {
        setPropertyId(response.data.data);
        toast.success("Property details submitted successfully!");
        handleNext();
      } else if (response.data.status_code === 409) {
        toast.error("Property with such name exists.");
      } else {
        toast.error(`An unexpected status code was received: ${response.data.status_code}`);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        toast.error("Property with such name exists.");
      } else {
        toast.error(`Failed to continue: ${error.message || "Unknown error"}`);
      }
    });
  };
  
  
  const uploadPhotos = async (photos: File[]) => {
    if (!propertyId) return;

    if (photos.length === 0) {
      toast.error("Please select at least one photo to upload.");
      return;
    }
    
    const formData = new FormData();
    photos.forEach((photo) => formData.append("photos", photo));

    return handleAxiosRequest(
      (cancelToken) =>
        axios.put(
          `${apiUrl}/api/property/upload_photo/${propertyId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getToken()}`,
            },
            cancelToken: cancelToken.token,
          }
        ),
      "photos"
    )
      .then((response) => {
        setCurrentStep(currentStep + 1)
        console.log(response);
      })
      .catch((error) => {
        toast.error(`Failed to continue: ${error.message || "Unknown error"}`);
      });
  };

  const addAmenities = async (amenities: AddPropertyAmenities) => {
    if (!propertyId) return;

    return handleAxiosRequest(
      (cancelToken) =>
        axios.put(
          `${apiUrl}/api/property/add_amenities/${propertyId}`,
          amenities,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
            cancelToken: cancelToken.token,
          }
        ),
      "amenities"
    )
      .then(() => {
        toast.success("Property Added Succesfully")
        setCurrentStep(currentStep);
      })
      .catch((error) => {
        toast.error(`Failed to continue: ${error.message || "Unknown error"}`);
      });
  };

  return (
    <PropertyContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        submitPropertyDetails,
        uploadPhotos,
        addAmenities,
        propertyId,
        loading,
        error,
        submissionStatus,
        handleSkip,
        handleNext,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
