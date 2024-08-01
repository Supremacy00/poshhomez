"use client";
import { useCallback } from "react";
import axios from "axios";
import { getToken } from "@/utils/authUtils";

interface UseUploadHookProps {
  uploadEndpoint: string;
  onProgress: (progress: number) => void;
}

const useUploadHook = ({ uploadEndpoint, onProgress }: UseUploadHookProps) => {
  const uploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("photo", file);

      const token = getToken();
      try {
        const response = await axios.put(uploadEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            console.log(
              "Loaded:",
              progressEvent.loaded,
              "Total:",
              progressEvent.total
            );
            if (typeof progressEvent.total === "number") {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(percentCompleted);
            }
          },
        });

        onProgress(100);
        return response.data;
      } catch (error) {
        onProgress(0);
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data);
          throw new Error(error.response?.data);
        } else {
          console.error(error);
          throw error;
        }
      }
    },
    [uploadEndpoint, onProgress]
  );

  return { uploadFile };
};

export default useUploadHook;
