"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaClipboard,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useModal } from "@/contexts/modalContext/ModalContext";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick";

interface CustomShareSocialProps {
  title: string;
}

const CustomShareSocial: React.FC<CustomShareSocialProps> = ({ title }) => {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const { isModal, setIsModal, handleIsModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const url = usePathname();

  useCloseOnOutsideClick(isModal, () => setIsModal(false), modalRef);

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModal]);

  const shareLinks = [
    {
      platform: "Facebook",
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: <FaFacebook />,
    },
    {
      platform: "Twitter",
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      icon: <FaTwitter />,
    },
    {
      platform: "LinkedIn",
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
      icon: <FaLinkedin />,
    },
    {
      platform: "WhatsApp",
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(
        title
      )}%20${encodeURIComponent(url)}`,
      icon: <FaWhatsapp />,
    },
    {
      platform: "Email",
      name: "Email",
      url: `mailto:?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(url)}`,
      icon: <FaEnvelope />,
    },
  ];

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess(""), 3000);
        })
        .catch(() => setCopySuccess("Failed to copy!"));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 3000);
      } catch (err) {
        setCopySuccess("Failed to copy!");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="font-nunito fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-primary-text">
      <div className="fixed xs:inset-0 flex justify-center items-center xs:px-5 bottom-5 right-5 left-5">
        <div
          className="relative w-[550px] bg-white rounded-xl px-5 py-10 text-center overflow-hidden no-scrollbar"
          ref={modalRef}
        >
          <h3 className="text-base font-semibold mb-7">Share this page</h3>
          <div className="w-full flex justify-center items-center mb-8">
            <div className="flex overflow-x-auto space-x-4">
              {shareLinks.map((link, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-primary-text hover:text-gray-900 transition-colors duration-300 ease-in-out cursor-pointer">
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${link.platform}`}
                      className="text-[27px]"
                    >
                      {link.icon}
                    </Link>
                  </div>
                  <p className="text-sm text-center">{link.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200 my-7" />
          <div className="relative w-full flex flex-col space-y-2 p-1.5">
            <div className="relative w-full">
              <input
                type="text"
                value={url}
                readOnly
                className="text-[15px] w-full pl-3 py-3 pr-32 border-[1.5px] border-secondary bg-gray-100 rounded-lg"
              />
              <button
                onClick={handleCopyClick}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 transition-colors duration-300 ease-in-out flex items-center space-x-1"
              >
                <FaClipboard className="text-sm" />
                <span className="text-[13px] font-sans font-medium">
                  {copySuccess || "Copy URL"}
                </span>
              </button>
            </div>
          </div>
          <span
            className="absolute top-4 right-4 text-[22px] p-2 bg-custom4 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-300 ease-in-out"
            onClick={handleIsModal}
          >
            <AiOutlineClose />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomShareSocial;
