'use client'
import { useState, useEffect, useRef } from 'react';

interface DropdownPosition {
  country: boolean;
  state: boolean;
  city: boolean;
  occupant_gender: boolean;
}

function throttle<F extends (...args: any[]) => void>(func: F, limit: number): (...args: Parameters<F>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<F>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export const useLocationSelector = () => {
  const [isCountryVisible, setIsCountryVisible] = useState<boolean>(false);
  const [isStateVisible, setIsStateVisible] = useState<boolean>(false);
  const [isCityVisible, setIsCityVisible] = useState<boolean>(false);
  const [isGenderVisible, setIsGenderVisible] = useState<boolean>(false);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    country: false,
    state: false,
    city: false,
    occupant_gender: false,
  });

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);
  const stateDropdownRef = useRef<HTMLDivElement | null>(null);
  const cityDropdownRef = useRef<HTMLDivElement | null>(null);
  const genderDropdownRef = useRef<HTMLDivElement | null>(null);

  const calculateAndSetDropdownPosition = (ref: React.RefObject<HTMLDivElement>, type: keyof DropdownPosition) => {
    if (!ref.current) return;

    const dropdownRect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - dropdownRect.bottom;
    const spaceAbove = dropdownRect.top;
    const dropdownHeight = dropdownRect.height;

    const buffer = 150;

    const shouldOpenUpwards = spaceBelow < dropdownHeight + buffer && spaceAbove >= dropdownHeight + buffer;

    setDropdownPosition((prevState) => ({
      ...prevState,
      [type]: shouldOpenUpwards,
    }));
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (isCountryVisible) calculateAndSetDropdownPosition(countryDropdownRef, 'country');
      if (isStateVisible) calculateAndSetDropdownPosition(stateDropdownRef, 'state');
      if (isCityVisible) calculateAndSetDropdownPosition(cityDropdownRef, 'city');
      if (isGenderVisible) calculateAndSetDropdownPosition(genderDropdownRef, 'occupant_gender');
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCountryVisible, isStateVisible, isCityVisible, isGenderVisible]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdownRefs = [countryDropdownRef, stateDropdownRef, cityDropdownRef, genderDropdownRef];

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        dropdownRefs.every((ref) => !ref?.current?.contains(event.target as Node))
      ) {
        setIsCountryVisible(false);
        setIsStateVisible(false);
        setIsCityVisible(false);
        setIsGenderVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [wrapperRef, countryDropdownRef, stateDropdownRef, cityDropdownRef, genderDropdownRef]);

  const toggleCountryDropdown = () => {
    setIsCountryVisible((prev) => !prev);
    if (!isCountryVisible) setTimeout(() => calculateAndSetDropdownPosition(countryDropdownRef, 'country'), 0);
    setIsStateVisible(false);
    setIsCityVisible(false);
    setIsGenderVisible(false);
  };

  const toggleStateDropdown = () => {
    setIsStateVisible((prev) => !prev);
    if (!isStateVisible) setTimeout(() => calculateAndSetDropdownPosition(stateDropdownRef, 'state'), 0);
    setIsCountryVisible(false);
    setIsCityVisible(false);
    setIsGenderVisible(false);
  };

  const toggleCityDropdown = () => {
    setIsCityVisible((prev) => !prev);
    if (!isCityVisible) setTimeout(() => calculateAndSetDropdownPosition(cityDropdownRef, 'city'), 0);
    setIsCountryVisible(false);
    setIsStateVisible(false);
    setIsGenderVisible(false);
  };

  const toggleGenderDropdown = () => {
    setIsGenderVisible((prev) => !prev);
    if (!isGenderVisible) setTimeout(() => calculateAndSetDropdownPosition(genderDropdownRef, 'occupant_gender'), 0);
    setIsCountryVisible(false);
    setIsStateVisible(false);
    setIsCityVisible(false);
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setIsCountryVisible(false);
  };

  const handleSelectState = (state: string) => {
    setSelectedState(state);
    setIsStateVisible(false);
  };

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    setIsCityVisible(false);
  };

  const handleSelectGender = (gender: string) => {
    setSelectedGender(gender);
    setIsGenderVisible(false);
    setIsCountryVisible(false);
    setIsStateVisible(false);
    setIsCityVisible(false);
  };

  return {
    isCountryVisible,
    isStateVisible,
    isCityVisible,
    isGenderVisible,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedGender,
    toggleCountryDropdown,
    toggleStateDropdown,
    toggleCityDropdown,
    toggleGenderDropdown,
    handleSelectCountry,
    handleSelectState,
    handleSelectCity,
    handleSelectGender,
    wrapperRef,
    countryDropdownRef,
    stateDropdownRef,
    cityDropdownRef,
    genderDropdownRef,
    dropdownPosition,
  };
};
