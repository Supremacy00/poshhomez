import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { usePropertyContext } from "@/contexts/addPropertyContext/AddPropertyContext";
import { BsArrowUpRight } from "react-icons/bs";
import { ImFilePicture } from "react-icons/im";
import { FadeLoader } from "react-spinners";
import Image from "next/image";

const Photos = () => {
  const { propertyId, uploadPhotos, loading, setCurrentStep, currentStep } = usePropertyContext();
  const [photos, setPhotos] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );
    if (newPhotos.length !== acceptedFiles.length) {
      toast.error("Some files were ignored. Only JPEG or PNG are allowed.");
    }

    setPhotos((prev) => [...prev, ...newPhotos]);
  }, []);

  const removePhoto = useCallback((index: number) => {
    setPhotos((currentPhotos) => currentPhotos.filter((_, i) => i !== index));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  const handleUploadClick = async () => {
    if (!propertyId) {
      console.error("Property ID is missing.");
      return;
    }

    if (!uploadPhotos) {
      console.error("uploadPhotos function is undefined.");
      return;
    }

    await uploadPhotos(photos, propertyId);
  };

  const handleSkip = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <section>
      <div
        {...getRootProps()}
        className="border-red-500 border-[1px] border-dashed rounded-xl px-4 py-16 cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="flex justify-center items-center mx-auto text-8xl text-custom11 mb-5">
          <ImFilePicture />
        </div>
        <div className="text-center">
          <h2 className="text-[17px] font-semibold text-primary-text mb-3.5">
            Upload photos of your property
          </h2>
          <p className="text-sm">
            Photos must be JPEG or PNG format and at least 2048x768
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-4 font-dm">
        {photos.map((file, index) => {
          const src = URL.createObjectURL(file);
          return (
            <div key={index} className="w-32 h-32 relative">
              <Image
                src={src}
                alt={`preview ${index}`}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-md"
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
      <section className="text-primary-text flex justify-between items-center pt-12 pb-5">
        <div className="relative">
          <button
            onClick={handleSkip}
            className={`${
              loading.photos ? "bg-primary-text text-white" : ""
            } relative flex items-center gap-2.5 px-[50px] py-3.5 border-[1px] border-primary-text rounded-xl hover:bg-primary-text hover:text-white transition-colors duration-300 ease-in-out`}
          >
            <h4 className="text-[15px] font-semibold">Skip Step</h4>
            {loading.photos ? (
              <span className="flex justify-center items-center relative -right-4 top-3.5">
                <FadeLoader
                  color="#ffffff"
                  height={4}
                  margin={-12}
                  radius={2}
                  width={2}
                />
              </span>
            ) : (
              <BsArrowUpRight className="text-[17px]" />
            )}
          </button>
        </div>
        <div className="relative">
          <button
            onClick={handleSkip}
            className={`${
              loading.photos ? "bg-primary-text text-white" : ""
            } relative flex items-center gap-2.5 px-[50px] py-3.5 border-[1px] border-primary-text rounded-xl hover:bg-primary-text hover:text-white transition-colors duration-300 ease-in-out`}
          >
            <h4 className="text-[15px] font-semibold">Continue</h4>
            <BsArrowUpRight className="text-[17px]" />
          </button>
        </div>
      </section>
    </section>
  );
};

export default Photos;
