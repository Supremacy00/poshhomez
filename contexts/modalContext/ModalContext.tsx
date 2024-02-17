"use client";
import React, { createContext, useContext, useState, useMemo, ReactNode, useCallback } from "react";
import { ModalContextProps } from "@/@types";

interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isLeftNav, setIsLeftNav] = useState(false);
  const [isRightNav, setIsRightNav] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);

  const handleIsLeftNav = useCallback(() => {
    setIsLeftNav(!isLeftNav);
  }, [isLeftNav]);

  const handleIsRightNav = useCallback(() => {
    setIsRightNav(!isRightNav);
  }, [isRightNav]);

  const handleIsLoginModal = useCallback(() => {
    setIsLoginModal(!isLoginModal);
  }, [isLoginModal]);

  const handleIsAdvanceSearch = useCallback(() => {
    setIsAdvanceSearch(!isAdvanceSearch);
  }, [isAdvanceSearch]);

  const contextValue: ModalContextProps = useMemo(() => {
    return {
      isLeftNav,
      setIsLeftNav,
      isRightNav,
      setIsRightNav,
      isLoginModal,
      setIsLoginModal,
      isAdvanceSearch,
      setIsAdvanceSearch,
      handleIsLeftNav,
      handleIsRightNav,
      handleIsLoginModal,
      handleIsAdvanceSearch,
    };
  }, [
    isLeftNav,
    setIsLeftNav,
    isRightNav,
    setIsRightNav,
    isLoginModal,
    setIsLoginModal,
    isAdvanceSearch,
    setIsAdvanceSearch,
    handleIsLeftNav,
    handleIsRightNav,
    handleIsLoginModal,
    handleIsAdvanceSearch,
  ]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
