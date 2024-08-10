'use client'
import { useState, useEffect } from 'react';

export const useClientOnly = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
