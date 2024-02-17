'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface ApartmentIdContextType {
  apartmentid: string | null | undefined;
} 

const ApartmentIdContext = createContext<ApartmentIdContextType | null>(null);

export const ApartmentIdProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [apartmentid, setApartmentid] = useState<string | null | undefined>(null);
  const router = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = Array.isArray(router.apartmentid) ? router.apartmentid[0] : router.apartmentid;
      setApartmentid(id);
    }
  }, [router.apartmentid]);

  return (
    <ApartmentIdContext.Provider value={{ apartmentid }}>
      {children}
    </ApartmentIdContext.Provider>
  );
};

export const useApartmentId = (): string | undefined => {
  const context = useContext(ApartmentIdContext);
  return context?.apartmentid ?? undefined;
};
