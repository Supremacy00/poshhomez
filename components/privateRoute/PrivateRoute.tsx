'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext/Auth-Context';
import { useModal } from '@/contexts/modalContext/ModalContext'; 
import { useEffect } from 'react';

interface PrivateRouteProps {
  href: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ href, children }) => {
  const { isAuthenticated } = useAuth();
  const { isLoginModal, setIsLoginModal } = useModal();
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    if (!isAuthenticated) {
      localStorage.setItem('intendedRoute', href);
      setIsLoginModal(true);
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isLoginModal) {
      setIsLoginModal(false);
    }

  }, [isAuthenticated, router, isLoginModal, setIsLoginModal]);
  
  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default PrivateRoute;
