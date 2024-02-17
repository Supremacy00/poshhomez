import { useState, useEffect } from "react";
import { mutate } from "swr";
import { useAuth } from "@/contexts/authContext/Auth-Context";

interface IUser {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

interface IUpdateUserData {
  name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
}

interface EditModes {
  fullName: boolean;
  email: boolean;
  phoneNumber: boolean;
  address: boolean;
}

const useUserProfile = () => {
  const { user } = useAuth();
  const [editModes, setEditModes] = useState<EditModes>({
    fullName: false,
    email: false,
    phoneNumber: false,
    address: false,
  });

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [editFullName, setEditFullName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editPhoneNumber, setEditPhoneNumber] = useState<string>("");
  const [editAddress, setEditAddress] = useState<string>("");

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phone_number || "");
      setAddress(user.address || "");

      setEditFullName(user.name || "");
      setEditEmail(user.email || "");
      setEditPhoneNumber(user.phone_number || "");
      setEditAddress(user.address || "");
    }
  }, [user]);

  const toggleFieldEditMode = (field: keyof EditModes) => {
    setEditModes((prevModes) => ({
      ...prevModes,
      [field]: !prevModes[field],
    }));
  };

  const updateUserData = async (updatedData: IUpdateUserData) => {
    try {
      
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update user data");

      setFullName(updatedData.name || fullName);
      setEmail(updatedData.email || email);
      setPhoneNumber(updatedData.phone_number || phoneNumber);
      setAddress(updatedData.address || address);

      await mutate("user");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return {
    fullName,
    email,
    phoneNumber,
    address,
    editFullName,
    setEditFullName,
    editEmail,
    setEditEmail,
    editPhoneNumber,
    setEditPhoneNumber,
    editAddress,
    setEditAddress,
    editModes,
    toggleFieldEditMode,
    updateUserData,
  };
};

export default useUserProfile;
