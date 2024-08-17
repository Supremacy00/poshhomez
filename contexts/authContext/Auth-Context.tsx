"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import useSWR from "swr";
import axios from "axios";
import { toast } from "sonner";
import { useModal } from "../modalContext/ModalContext";
import { isTokenExpired, getToken, removeToken } from "@/utils/authUtils";
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

  const token = getToken();
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
  const toastIdRef = useRef<string | number | null>(null);

  const fetchUser = async () => {
    try {
      const token = getToken();
      if (!token) return null;

      const response = await axios.get(`${API_URL}/auth/get_current_user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      if (toastIdRef.current === null) {
        toastIdRef.current = toast.error("Network Error! Please try again.");
      }
      return null;
    } finally {
      setIsAuthChecking(false);
    }
  };

  const {
    data: user,
    error,
    mutate,
  } = useSWR("user", fetchUser, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    refreshInterval: 600000,
  });

  const signUp = async (formData: SignUpCredentials) => {
    setSignupLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status_code === 201) {
        toast.success("Registration successful!");
        router.push("/auth/login");
      } else {
        toast.error(
          response.data.message || "An error occurred. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Signup failed", error.response?.data || error.message);
      toast.error("Signup failed. Please try again.");
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
        localStorage.setItem("token", response.data.access_token);

        const userResponse = await fetchUser();
        mutate(userResponse);

        const intendedRoute = localStorage.getItem("intendedRoute");
        router.push(intendedRoute || "/");
        setIsLoginModal(false);
        toast.success("Login successful!");
        localStorage.removeItem("intendedRoute");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const token = getToken();
      if (!token) return;

      await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      removeToken();
      mutate(null, true);
      router.push("/");
      toast.info("Signed out successfully!");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        await fetchUser();
      } else {
        setIsAuthChecking(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading: !user && !error,
        loginLoading,
        signupLoading,
        isAuthChecking,
        error,
        signUp,
        logIn,
        logOut,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
