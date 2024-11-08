import { useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import axios from "axios";
import { ApiResponse } from "@/@types";

interface PaginatedApiResponse extends ApiResponse {
  page: number;
  limit: number;
  totalCount: number;
}

interface ApiWithSWRConfig
  extends SWRConfiguration<PaginatedApiResponse, Error> {
  defaultLimit?: number;
}

const fetcher = async (url: string) => {
  try {
    const response = await axios.get<PaginatedApiResponse>(url);
    return response.data;
  } catch (error) {
    const errorDetails = (error as any)?.response?.data?.detail;

    if (Array.isArray(errorDetails) && errorDetails.length > 0) {
      const firstError = errorDetails[0];
      const location = firstError.loc.join(", ");
      const errorMessage = firstError.msg;
      const errorType = firstError.type;

      console.error(
        `Error Type: ${errorType}, Location: ${location}, Message: ${errorMessage}`
      );
    }

    throw (error as any)?.response?.data;
  }
};

const useApiWithSWR = (
  endpoint: string,
  initialPage: number = 1,
  { defaultLimit = 8, ...config }: ApiWithSWRConfig = {}
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const limit = defaultLimit;

  const url = endpoint
    ? `${endpoint}?page=${currentPage}&limit=${limit}`
    : null;

  const { data, error } = useSWR<PaginatedApiResponse, Error>(url, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    refreshInterval: 600000,
    ...config,
  });

  const totalProperties =
    (data?.data as { [key: string]: any })?.["Number of properties"] || 0;
  const totalCount = Math.ceil(totalProperties / limit);

  const isLoading = data === undefined && !error;
  const isError = !!error;

  const fetchPage = async (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    isLoading,
    isError,
    currentPage,
    fetchPage,
    limit,
    totalCount,
    totalProperties,
  };
};


export default useApiWithSWR;
