import { useState, useEffect } from "react";
import axios from "axios";
import { mutate } from "swr";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getToken, getUserId, getUserRole } from "@/utils/authUtils";
import { toast } from "sonner";

interface IUpdateUserData {
  name?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
}

interface EditModes {
  fullName: boolean;
  email: boolean;
  phoneNumber: boolean;
  gender: boolean;
}

const useUserProfile = () => {
  const { user } = useAuth();
  const [editModes, setEditModes] = useState<EditModes>({
    fullName: false,
    email: false,
    phoneNumber: false,
    gender: false,
  });

  const userRole = getUserRole();
  const userId = getUserId();
  const token = getToken();

  const endpoint = user && userRole === "Tenant"
    ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/tenant/${userId}`
    : `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/landlord/${userId}`;

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const [editFullName, setEditFullName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>("");
  const [editGender, setEditGender] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phone_number || "");
      setGender(user.gender || "");

      setEditFullName(user.name || "");
      setEditEmail(user.email || "");
      setEditPhoneNumber(user.phone_number || "");
      setEditGender(user.gender || "");
    }
  }, [user]);

  
  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    setHasChanges(true);
  };

  const toggleFieldEditMode = (field: keyof EditModes) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [field]: !prevModes[field],
    }));
  };

  const updateUserData = async (updatedData: IUpdateUserData) => {
    setLoading(true);
    setError(null);
    console.log(updatedData)
    try {
      
      
      const response = await axios.put(endpoint, updatedData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("This is the user response", response, "user :", user)

      if (response.data.status_code === 200) {
        toast.success("Profile updated successfully")
      }

      const updatedUser = response.data;
      setFullName(updatedUser.name || fullName);
      setEmail(updatedUser.email || email);
      setPhoneNumber(updatedUser.phone_number || phoneNumber);
      setGender(updatedUser.gender || gender);

      await mutate("user");
    } catch (error) {
      console.error("Error updating user data:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    email,
    phoneNumber,
    gender,
    editFullName,
    setEditFullName,
    editEmail,
    setEditEmail,
    editPhoneNumber,
    setEditPhoneNumber,
    editGender,
    setEditGender,
    editModes,
    toggleFieldEditMode,
    updateUserData,
    loading,
    error,
    handleChange,
    hasChanges
  };
};

export default useUserProfile;
