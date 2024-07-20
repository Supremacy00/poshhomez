"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import { useModal } from "../modalContext/ModalContext";
import { isTokenExpired } from "@/utils/authUtils";
import { useRouter } from "next/navigation";

import {
  SignUpCredentials,
  AuthContextProps,
  LoginCredentials,
} from "@/@types";

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const isAuthenticated =
    context.user !== null && token !== null && !isTokenExpired(token);

  return { ...context, isAuthenticated };
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { setIsLoginModal } = useModal();
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const {
    data: user,
    error,
    mutate,
  } = useSWR(
    "user",
    () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      return token ? fetchUser() : null;
    },
    {
      revalidateOnMount: true,
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      refreshInterval: 600000,
    }
  );

  const isLoading = !user && !error;

  const fetchUser = async () => {
    setIsAuthChecking(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthChecking(false);
      return null;
    }

    try {
      const response = await axios.get(`${API_URL}/auth/get_current_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.status) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }
      setProfilePictureUrl(response.data.avatar?.secure_url || null);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error;
    } finally {
      setIsAuthChecking(false);
    }
  };

  const signUp = async (formData: SignUpCredentials) => {
    setSignupLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status_code === 201) {
        toast.success("Registration was sucessfull!");
        router.push('/auth/login')
      } else if (response.data.status_code === 409) {
        toast.error(response.data.message || "Account already exist.");
      } else {
        toast.error("An error occured. Please try again");
      }
    } catch (error: any) {
      console.error("Signup failed", error.response?.data || error.message);
      throw error;
    } finally {
      setSignupLoading(false);
    }
  };

  const logIn = async (loginCredentials: LoginCredentials) => {
    setLoginLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        new URLSearchParams({
          username: loginCredentials.email,
          password: loginCredentials.password,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      
      if (response.data.access_token) {
        const token = response.data.access_token;
        localStorage.setItem("token", token);

        try {
          const userResponse = await fetchUser();
          mutate({ ...user, ...userResponse });
        } catch (userError) {
          console.error("Error fetching user data after login", userError);
        }

        const intendedRoute = localStorage.getItem("intendedRoute");
        if (intendedRoute) {
          router.push(intendedRoute);
          setIsLoginModal(false);
          localStorage.removeItem("intendedRoute");
        } else {
          router.push("/");
        }
        toast.success("Login successful!");
      } else {
        if (response.data.status_code === 404) {
          toast.error("Invalid login credentials");
        } else {
          if (response.data.status_code === 401) {
            toast.error("Email or password is incorrect");
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        }
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Network Error. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("token");
      mutate(undefined, true);
      router.push("/");
      toast.info("Signed out successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again");
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const updateProfilePicture = useCallback((url: string | null) => {
    setProfilePictureUrl(url);
    // Use mutate to update cached user data with the new profile picture URL
    mutate((data: any) => ({
      ...data,
      avatar: {
        ...data.avatar,
        secure_url: url,
      },
    }), false); // Set to false to prevent automatic revalidation
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token ) {
      fetchUser()
    } else {
      setIsAuthChecking(false)
    }
  }, []);


  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        loginLoading,
        signupLoading,
        isAuthChecking,
        error,
        signUp,
        logIn,
        logOut,
        handleLogout,
        profilePictureUrl,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
