import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <article className="group">
      <div className="skeleton-placeholder bg-gray-300 bg-opacity-40 w-full  h-[180px] rounded-md md:h-[250px] lg:h-[220px] mb-4 animate-pulse custom-shine"></div>
      <div className="skeleton-placeholder bg-gray-300 bg-opacity-40 h-4 w-1/2 rounded-full mb-2 animate-pulse custom-shine"></div>
      <div className="skeleton-placeholder bg-gray-300 bg-opacity-40 h-4 w-1/4 rounded-full mb-2 animate-pulse custom-shine"></div>
    </article>
  );
};

export default SkeletonLoader;
