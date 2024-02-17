'use client'
import { useState } from 'react';

type ContentMenuState = string;

export const useContentMenu = (initialMenu: ContentMenuState = '') => {
  const [contentMenu, setContentMenu] = useState<ContentMenuState>(initialMenu);

  const handleContentMenu = (status: ContentMenuState) => {
    if (status !== contentMenu) {
      console.log(`Changing content menu to: ${status}`);
      setContentMenu(status);
    }
  };


  
  return { contentMenu, handleContentMenu };
};
