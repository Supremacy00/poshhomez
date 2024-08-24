"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useUploadHook from "@/hooks/useUploadHook";
import { mutate } from "swr";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getUserId } from "@/utils/authUtils";
import { getUserRole } from "@/utils/authUtils";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { toast } from "sonner";

const UserFileUploader = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();
  const userRole = getUserRole();
  const userId = getUserId();

  const uploadEndpoint =
    user && userRole === "Tenant"
      ? `${process.env.NEXT_PUBLIC_TENANT_UPLOAD_ENDPOINT}/${userId}`
      : `${process.env.NEXT_PUBLIC_LANDLORD_UPLOAD_ENDPOINT}/${userId}`;

  const { uploadFile } = useUploadHook({
    uploadEndpoint,
    onProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const resetUploadState = () => {
    setUploadProgress(0);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (uploadProgress === 100) {
      timeout = setTimeout(() => {
        resetUploadState();
      }, 3000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [uploadProgress]);

  const resizeAndCompressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const MAX_WIDTH = 1500;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error("Failed to compress image"));
                }
              },
              file.type,
              0.5
            );
          } else {
            reject(new Error("Failed to compress image"));
          }
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }
    setUploadProgress(0);
    try {
      const compressedImageBlob = await resizeAndCompressImage(file);
      const compressedFile = new File([compressedImageBlob], file.name, {
        type: file.type,
      });
      const response = await uploadFile(compressedFile);
      if (response.status_code === 200) {
        toast.success("Photo has been successfully uploaded");
      }
      await mutate("user");
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
      className="relative text-secondary border-[1px] text-[15px] font-light border-custom11 bg-slate-100 border-dashed overflow-hidden text-center flex justify-center items-center rounded-xl h-[159px] cursor-pointer xs:w-[180px]"
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
        <TbRosetteDiscountCheckFilled />
      </div>
      {!uploadProgress &&
        (isDragActive ? (
          <p className="text-secondary">Drop the profile picture here...</p>
        ) : (
          <>
            <p className="text-secondary hidden lg:block">
              Drag n drop a profile picture here, or click to select
            </p>
            <p className="text-secondary lg:hidden">
              Click to upload profile picture
            </p>
          </>
        ))}
    </div>
  );
};

export default UserFileUploader;
