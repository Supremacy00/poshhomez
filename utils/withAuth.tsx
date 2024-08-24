"use client";
import React, { useEffect, ComponentType, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { isAuthenticated } from "./authUtils";
import PageLoader from "@/components/loader/PageLoader";
import { useNotifications } from "@/hooks/useNotifications";

function withAuth<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  const RequiresAuth = (props: T): ReactElement | null => {
    const { isAuthChecking, isLoading } = useAuth();
    const { isLoading: isNotification } = useNotifications();
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = isAuthenticated();
      if (!isLoggedIn) {
        router.push("/auth/login");
      }
    }, []);

    if (isLoading || isAuthChecking || isNotification) {
      return (
        <div>
          <PageLoader />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  RequiresAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return RequiresAuth;
}

export default withAuth;
