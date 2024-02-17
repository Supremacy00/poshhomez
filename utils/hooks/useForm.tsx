import { useState } from "react";

interface FormStep {
  description: string;
  amenities: string[];
  photos: string[];
}

interface FormState {
  currentStep: number;
  steps: FormStep[];
}

const useForm = (initialSteps: FormStep[]) => {
  const [formState, setFormState] = useState<FormState>({
    currentStep: 0,
    steps: initialSteps,
  });

  const goToNextStep = () => {
    setFormState((prevState) => ({
      ...prevState,
      currentStep: prevState.currentStep + 1,
    }));
  };

  const goToPrevStep = () => {
    setFormState((prevState) => ({
      ...prevState,
      currentStep: prevState.currentStep - 1,
    }));
  };

  const getCurrentStep = () => formState.steps[formState.currentStep];

  const isLastStep = () => formState.currentStep === formState.steps.length - 1;

  return {
    currentStep: formState.currentStep,
    totalSteps: formState.steps.length,
    goToNextStep,
    goToPrevStep,
    getCurrentStep,
    isLastStep,
  };
};

export default useForm;
