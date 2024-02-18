"use client";
import React, { useEffect } from "react";
import Image from "next/image";

interface ProfilePictureModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  imageUrl,
  onClose,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <section className="flex justify-center items-center ">
      <div className="mx-auto">
        <div className="cl">
          <Image
            src={imageUrl}
            alt="Profile Photo"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <span onClick={onClose}>Close</span>
      </div>
    </section>
  );
};

export default ProfilePictureModal;
