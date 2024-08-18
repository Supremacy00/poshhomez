"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useModal } from "@/contexts/modalContext/ModalContext";

interface PrivateRouteProps {
  href: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ href, children }) => {
  const { isAuthenticated } = useAuth();
  const { isLoginModal, setIsLoginModal } = useModal();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      localStorage.setItem("intendedRoute", href);
      setIsLoginModal(true);
    }
  };

  useEffect(() => {
    const intendedRoute = localStorage.getItem("intendedRoute");
    if (isAuthenticated) {
      if (intendedRoute) {
        router.push(intendedRoute);
        localStorage.removeItem("intendedRoute");
      }
      setIsLoginModal(false);
    }
  }, [isAuthenticated, router, setIsLoginModal]);

  return <div onClick={handleClick}>{children}</div>;
};

export default PrivateRoute;
