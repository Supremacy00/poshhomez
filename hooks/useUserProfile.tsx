import { useState, useEffect } from "react";
import { mutate } from "swr";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { getToken, getUserId, getUserRole } from "@/utils/authUtils";
import axios from "axios";

interface IUpdateUserData {
  name?: string;
  email?: string;
  phone_number?: string;
  gender?: string;
  password?: string;
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

  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error("API endpoint is not defined");
  }

  const endpoint =
    user && userRole === "Tenant"
      ? `${apiEndpoint}/api/tenant/${userId}`
      : `${apiEndpoint}/api/landlord/${userId}`;

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
    try {
      const dataToUpdate = {
        ...user,
        ...updatedData,
      };

      const { password, ...dataWithoutPassword } = dataToUpdate;
      const finalData =
        password === undefined ? dataWithoutPassword : dataToUpdate;

      console.log("This is a full data", dataToUpdate);
      const response = await axios.put(endpoint, finalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200)
        throw new Error("Failed to update user data");

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
    editFullName,
    setEditFullName,
    editEmail,
    setEditEmail,
    editPhoneNumber,
    setEditPhoneNumber,
    editModes,
    toggleFieldEditMode,
    updateUserData,
    loading,
    handleChange,
    hasChanges,
  };
};

export default useUserProfile;
