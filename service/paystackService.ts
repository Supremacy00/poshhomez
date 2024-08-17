import axios from "axios";
import { getToken } from "@/utils/authUtils";
import { toast } from "sonner";

const PAYSTACK_PAYMENT_URL = process.env.NEXT_PUBLIC_PAYSTACK_PAYMENT || "";

export const initializePayment = async (property_id: string) => {
  const token = getToken();
  if (!token) {
    alert("Authorization token is missing. Please log in.");
    return null;
  }

  try {
    const response = await axios.post(
      `${PAYSTACK_PAYMENT_URL}/initiate_payment/${property_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Transaction Initialized:", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    handlePaymentError(error);
  }
};

// Error Handling
const handlePaymentError = (error: any) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        console.error(
          "Client-side Error: Validation or request issue.",
          error.response.data
        );
        toast.error(
          "There was a problem with your request. Please check and try again."
        );
        break;
      case 401:
        console.error("Unauthorized: Invalid Token", error.response.data);
        toast.error("Authorization failed. Please check your secret key.");
        break;
      case 404:
        console.error("Resource Not Found:", error.response.data);
        alert("The requested resource could not be found.");
        break;
      case 500:
        console.error("Server Error:", error.response.data);
        toast.error("Server Error: The requested resource could not be found.");
        break;
      case 502:
      case 503:
      case 504:
        console.error("Server Error: Paystack's end.", error.response.data);
        toast.error(
          "There was an error on the payment server. Please try again later."
        );
        break;
      default:
        console.error("Unknown Error:", error.response.data);
        toast.error("An unknown error occurred. Please try again.");
        break;
    }
  } else {
    console.error("Network Error or Request Failed:", error.message);
    toast.error(
      "There was a network error. Please check your connection and try again."
    );
  }
};
