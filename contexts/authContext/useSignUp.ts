import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { SignUpCredentials } from "@/@types";

interface SignUpHook {
  signUp: (data: SignUpCredentials) => Promise<void>;
  gender: string;
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
  setGender: Dispatch<SetStateAction<string>>;
  isRole: boolean;
  isGender: boolean;
  setIsRole: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGender: React.Dispatch<React.SetStateAction<boolean>>;
  handleIsGender: () => void;
  handleIsRole: () => void;
  genderDropdownRef: MutableRefObject<HTMLDivElement | null>;
  roleDropdownRef: MutableRefObject<HTMLDivElement | null>;
}

const useSignUp = (): SignUpHook => {
  const { signUp } = useAuth();
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  const [isGender, setIsGender] = useState(false);
  const [isRole, setIsRole] = useState(false);

  const genderDropdownRef = useRef<HTMLDivElement | null>(null);
  const roleDropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      genderDropdownRef.current &&
      !genderDropdownRef.current.contains(event.target as Node)
    ) {
      setIsGender(false);
    }

    if (
      roleDropdownRef.current &&
      !roleDropdownRef.current.contains(event.target as Node)
    ) {
      setIsRole(false);
    }
  };

  const handleIsGender = () => {
    setIsGender(!isGender);
    setIsRole(false);
  };

  const handleIsRole = () => {
    setIsRole(!isRole);
    setIsGender(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [genderDropdownRef, roleDropdownRef]);

  return {
    signUp,
    gender,
    role,
    isGender,
    isRole,
    setRole,
    setGender,
    setIsRole,
    setIsGender,
    handleIsGender,
    handleIsRole,
    genderDropdownRef,
    roleDropdownRef,
  };
};

export default useSignUp;
