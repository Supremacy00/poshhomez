import axios from "axios";
import { getToken, getUserRole, getUserId } from "@/utils/authUtils";
import { toast } from "sonner";

const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  const userRole = getUserRole();
  const userId = getUserId();
  const token = getToken();

  const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error("API endpoint is not defined");
  }

  const endpoint =
    userRole === "Tenant"
      ? `${apiEndpoint}/api/tenant/password/${userId}`
      : `${apiEndpoint}/api/landlord/password/${userId}`;

  try {
    const response = await axios.put(
      endpoint,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          old_password: oldPassword,
          new_password: newPassword,
        },
      }
    );

    if (response?.data?.status_code === 200) {
      toast.success("Password changed successfully");
    } else if (response?.data?.status_code === 404) {
      toast.error("Current password is incorrect");
    } else {
      toast.error("Failed to change password! Try again");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};

export default changePassword;
