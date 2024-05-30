'use client'
import { useEffect } from 'react';

const useCloseOnOutsideClick = (
  isOpen: boolean,
  closeCallback: () => void,
  ...refs: React.RefObject<HTMLElement>[]
) => {
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        isOpen &&
        refs.every((ref) => ref.current && !ref.current.contains(e.target as Node))
      ) {
        closeCallback();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isOpen, closeCallback, refs]);
};

export default useCloseOnOutsideClick;
