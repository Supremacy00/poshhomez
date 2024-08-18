import axios from "axios";
import { getToken } from "@/utils/authUtils";
import { toast } from "sonner";

const PAYSTACK_PAYMENT_URL = process.env.NEXT_PUBLIC_PAYSTACK_PAYMENT || "";

export const initializePayment = async (property_id: string) => {
  const token = getToken();
  if (!token) {
    console.error("Authorization token is missing. Please log in.");
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

    const paymentDataResponse = response.data;
    const paymentDataStatusCode = paymentDataResponse.status_code;

    if (response.status === 200) {
      console.log(paymentDataResponse)
      if (paymentDataStatusCode === 401) {
        toast.error(
          paymentDataResponse.message ||
            "Unauthorized: Invalid action based on gender restrictions."
        );
        return null;
      } else if (paymentDataStatusCode === 409) {
        toast.error(
          paymentDataResponse.message || "This apartment is already occupied."
        );
        return null;
      }
      return paymentDataResponse.data;
    } else {
      handlePaymentError({ response });
    }
  } catch (error) {
    handlePaymentError(error);
  }
};

// Error Handling
const handlePaymentError = (error: any) => {
  const logAndToastError = (logMessage: string, toastMessage: string) => {
    console.error(logMessage, error.response?.data || error.message);
    toast.error(toastMessage);
  };

  if (error?.response) {
    const status = error.response.status;

    switch (status) {
      case 400:
        logAndToastError(
          "Client-side Error: Validation or request issue.",
          "There was a problem with your request. Please check and try again."
        );
        break;
      case 401:
        logAndToastError(
          "Unauthorized: Invalid Token",
          "Authorization failed. Please check your secret key."
        );
        break;
      case 404:
        logAndToastError(
          "Resource Not Found:",
          "The requested resource could not be found."
        );
        break;
      case 500:
        logAndToastError(
          "Server Error:",
          "Server Error: The requested resource could not be found."
        );
        break;
      case 502:
      case 503:
      case 504:
        logAndToastError(
          "Server Error: Paystack's end.",
          "There was an error on the payment server. Please try again later."
        );
        break;
      default:
        logAndToastError(
          "Unknown Error:",
          "An unknown error occurred. Please try again."
        );
        break;
    }
  } else {
    logAndToastError(
      "Unknown Error:",
      "An unknown error occurred. Please try again."
    );
  }
};
