import React from "react";

const NotificationLoader = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <div className="bg-gray-300 bg-opacity-40 rounded-full w-[50px] h-[50px] animate-pulse" />
      </div>
      <div className="w-full">
        <div className="bg-gray-300 bg-opacity-40 rounded-full w-full h-4 mb-3 animate-pulse" />
        <div className="bg-gray-300 bg-opacity-40 rounded-full w-52 h-4 animate-pulse" />
      </div>
    </div>
  );
};

export default NotificationLoader;
