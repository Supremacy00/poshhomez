import React from "react";
import { tailChase } from "ldrs";

const PageLoader: React.FC = () => {
  
  if (typeof window !== "undefined") {
    tailChase.register();
  }

  return (
    <div className="fixed top-0 right-0 left-0 z-50 bg-white w-full h-[100dvh] flex justify-center items-center">
      <l-tail-chase size="40" speed="1.75" color="#EB6753"></l-tail-chase>
    </div>
  );
};

export default PageLoader;
