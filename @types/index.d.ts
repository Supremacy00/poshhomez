import React from "react";

export interface RightNavProps {
  isRightNav: boolean;
  setIsRightNav: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalContextProps {
  isLeftNav: boolean;
  setIsLeftNav: React.Dispatch<React.SetStateAction<boolean>>;
  isRightNav: boolean;
  setIsRightNav: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginModal: boolean;
  setIsLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAdvanceSearch: boolean;
  setIsAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  handleIsLeftNav: () => void;
  handleIsRightNav: () => void;
  handleIsLoginModal: () => void;
  handleIsModal: () => void;
  handleIsAdvanceSearch: () => void;
}

export interface Description {
  bathroom_count: number;
  bedroom_count: number;
}

export interface Location {
  city: string;
  country: string;
  state: string;
  postal_code: string;
}

export interface PropertyCardDetails {
  photos: {
    public_id: string;
    secure_url: string;
  }[];
  amenities: {
    name: string;
    description: string;
  }[];
  photo?: string;
  rent_fee: number;
  is_occupied: boolean;
  name: string;
  address?: string;
  description?: Description;
  location?: Location;
  sqft?: number;
  id: string;
  year_built?: number;
  created_at: string;
  about: string;
}

interface WishlistContextType {
  wishlist: PropertyCardDetails[];
  addToWishlist: (property: PropertyCardDetails) => void;
  removeFromWishlist: (propertyId: string) => void;
  loadingMap: { [itemId: string]: boolean };
}

export interface SettingsProps {
  onClick: any;
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  nextArrow: ReactNode;
  prevArrow: ReactNode;
}

interface ApiResponse {
  status_code: number;
  message: string;
  data: {
    data: PropertyCardDetails[];
    page: number;
    limit: number;
  };
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
  };
}

export interface SignUpCredentials {
  name: string;
  phone_number: string;
  email: string;
  gender: string;
  avatar: { public_id: string; secure_url: string } | null;
  address: string | null;
  location: {
    city: string;
    state: string;
    country: string;
    postal_code: string;
  } | null;
  created_at: string;
  role: string;
  bank: {
    account_name: string;
    account_number: string;
    account_type: string;
    bank_name: string;
  } | null;
  active_contracts: any[];
  all_contracts: any[];
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface DecodedToken {
  id: string;
  role: string;
}

export interface AuthContextProps {
  user: Users | null;
  isLoading: boolean;
  loginLoading: boolean;
  signupLoading: boolean
  isAuthChecking: boolean;
  error: any;
  signUp: (formData: SignUpCredentials) => Promise<void>;
  logIn: (formData: LoginCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  handleLogout: () => Promise<void>;
  
}

export interface Users {
  data: User[];
  error: any;
  mutate: (
    data?: User[] | Promise<User[]>,
    shouldRevalidate?: boolean
  ) => Promise<User[] | undefined>;
  id: string;
  name: string;
  email: string;
  phone_number: string;
  gender: string;
  active_contracts: string[];
  address: string;
  all_contracts: string[];
  avatar?: Avatar;
  bank: {
    account_name: string;
    account_number: string;
    account_type: string;
    bank_name: string;
  };
  created_at: string;
  favorites: string[];
  location: {
    city: string;
    state: string;
    country: string;
  };
  role: string;
}

export interface LoginHook {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => Promise<void>;
}

export interface ProfileMenuProps {
  userRole: string;
  handleClick: () => void;
}

export interface ContentMenuContextType {
  contentMenu: string;
  handleContentMenu: (status: string) => void;
}

export interface ContentHandleMenuProps {
  handleMenu: () => void
}

export interface IUser {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface IUpdateUserData {
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
}

export interface MapProps {
  address?: string;
  zoom: number
}

export interface PropertyData {
  id: string;
  name: string;
  address: string;
  rent_fee: number;
  location: {
    city: string;
    state: string;
    country: string;
    postal_code: number;
  };
  occupant_gender: string;
  amenities: {
    name: string;
    description: string;
  }[];
  photos: {
    public_id: string;
    secure_url: string;
  }[];
  created_at: string;
  description: { bedroom_count: number; bathroom_count: number };
  year_built?: number;
  about?: string;
  is_occupied: boolean;
  latitude: number;
  longitude: number;
}

export interface ApartmentPhotoCarouselProps {
  photos: {
    public_id: string;
    secure_url: string;
  }[];
  name: string;
}

export interface ApartmentDetailsPageProps {
  apartmentid: string | undefined;
}

export interface PropertyDetails {
  id: string;
  name: string;
  rent_fee: number;
  photos: {
    public_id: string;
    secure_url: string;
  }[];
  is_occupied: boolean;
  created_at: string;
  data: PropertyCardDetails;
}

export interface ApiError {
  message: string;
}

interface ButtonProps {
  onClick?: () => void;
}

export interface MenuComponentMapProp {
  [key: string]: React.ComponentType;
}

export interface CityData {
  [key: string]: string[]; 
}

export interface CountryData {
  [key: string]: CityData; 
}

export interface LocationSelectorHook {
  isCountryVisible: boolean;
  isStateVisible: boolean;
  isCityVisible: boolean;
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  toggleCountryDropdown: () => void;
  toggleStateDropdown: () => void;
  toggleCityDropdown: () => void;
  handleSelectCountry: (country: string) => void;
  handleSelectState: (state: string) => void;
  handleSelectCity: (city: string) => void;
  countryDropdownRef: React.RefObject<HTMLDivElement>;
  stateDropdownRef: React.RefObject<HTMLDivElement>;
  cityDropdownRef: React.RefObject<HTMLDivElement>;
}

export interface AddPropertyAmenities {
    name: string;
    description: string | null;
}[]

export interface PropertyLocation {
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface PropertyDescription {
  bedroom_count: number;
  bathroom_count: number;
}

export interface AddPropertyDetails {
  name: string;
  address: string;
  location: PropertyLocation;
  occupant_gender: string;
  description: PropertyDescription;
  year_built?: number;
  about?: string;
  rent_fee: number;
  latitude: number;
  longitude: number;
  photos: {
    public_id: string;
    secure_url: string;
  }[];
  is_occupied: boolean;
  amenities: {
    name: string;
  }[];
  landlord_id: string;
  tenant_id: string;
  created_at: string;
  updated_at: string;
}

interface AddPropertyFormContextType {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  submitPropertyDetails: (details: AddPropertyDetails) => Promise<void>;
  uploadPhotos?: (photos: File[], propertyId: string) => Promise<void>;
  propertyId: string | null;
}

interface Notification {
  id: string;
  recipient_id: string;
  content: string;
  is_read: string;
  created_at: string;
  slug: string;
  none: string,
}


