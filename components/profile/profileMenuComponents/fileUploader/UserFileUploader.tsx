"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import useUploadHook from "@/hooks/useUploadHook";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserId } from "@/utils/authUtils";
import { getUserRole } from "@/utils/authUtils";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserFileUploader = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { user } = useAuth(); 
  const userRole = getUserRole();

  const userId = getUserId();
  const uploadEndpoint = user && userRole === "Tenant"
    ? `${process.env.NEXT_PUBLIC_TENANT_UPLOAD_ENDPOINT}/${userId}`
    : `${process.env.NEXT_PUBLIC_LANDLORD_UPLOAD_ENDPOINT}/${userId}`;

  const { uploadFile } = useUploadHook({
    uploadEndpoint,
    onProgress: (progress) => {
      console.log("Progress in Component:", progress);
      setUploadProgress(progress);
    },
  });

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    setUploadProgress(0);

    try {
      const response = await uploadFile(file);
      setUploadedImageUrl(response.imageUrl);
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/svg+xml": [],
        "image/jpg": [],
      },
      onDropRejected: () => {
        toast.error(
          "Unsupported file format. Please upload JPG, JPEG, PNG, or SVG files."
        );
      },
    });

  return (
    <div
      {...getRootProps()}
      className="relative text-secondary border-[1px] font-noto font-light border-custom11 bg-slate-50 border-dashed overflow-hidden text-center flex justify-center items-center rounded-xl h-[159px] cursor-pointer xs:w-[180px]"
    >
      <input {...getInputProps()} />
      {uploadProgress > 0 && uploadProgress <= 100 && (
        <div
          className={`${
            uploadProgress >= 100 ? " top-2" : "top-1/3"
          } absolute left-0 right-0 z-20 px-3 transition-all duration-500 ease-in-out`}
        >
          <div>
            <h3>{uploadProgress >= 100 ? "Upload Complete" : "Uploading"}</h3>
            <p className="text-[12px] text-secondary">{uploadProgress}%</p>
            <div className="bg-gray-200 w-full h-3 rounded">
              <div
                className="bg-green-500 h-3 rounded"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          uploadProgress >= 100 ? "bottom-2" : "-bottom-20"
        } absolute left-0 right-0 text-[70px] text-green-500 flex justify-center items-center transition-all duration-500 ease-in-out`}
      >
        <TbDiscountCheckFilled />
      </div>
      {!uploadProgress &&
        (isDragActive ? (
          <p className="text-secondary">Drop the profile picture here...</p>
        ) : (
          <p className="text-secondary">
            Drag n drop a profile picture here, or click to select
          </p>
        ))}
         <ToastContainer />
    </div>
  );
};

export default UserFileUploader;
