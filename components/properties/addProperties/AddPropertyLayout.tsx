import React from 'react';
import { usePropertyContext } from '@/contexts/addPropertyContext/AddPropertyContext';
import Description from "./addPropertyComponents/Description";
import Photos from "./addPropertyComponents/Photos";
import Amenities from "./addPropertyComponents/Amenities";

const AddPropertyLayout = () => {
  const { currentStep } = usePropertyContext();

  const renderStepComponent = () => {
    switch(currentStep) {
      case 1:
        return <Description />;
      case 2:
        return <Photos />;
      case 3:
        return <Amenities />;
    }
  };

  return (
    <main>
      {renderStepComponent()}
    </main>
  );
};

export default AddPropertyLayout;
