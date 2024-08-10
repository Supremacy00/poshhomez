import { useClientOnly } from "@/hooks/useClientOnly";
import React from "react";
import { PuffLoader } from "react-spinners";

const PageLoader: React.FC = () => {
  const hasMounted = useClientOnly()
  

  return (
    <div className="fixed top-0 right-0 left-0 z-50 bg-white w-full h-[100dvh] flex justify-center items-center">
      {hasMounted && <PuffLoader size={55} color="#EB6753"/> }
     
    </div>
  );
};

export default PageLoader;
