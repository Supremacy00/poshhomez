'use client'
import React, { useEffect, ComponentType, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import PageLoader from "@/components/loader/PageLoader";

function withAuth<T extends {}>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  const RequiresAuth = (props: T): ReactElement | null => {
    const { isAuthChecking, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user && !isAuthChecking) {
        router.push("/auth/login");
      }
    }, [user, isAuthChecking, router]);

    if (isAuthChecking && isLoading) {
      return (
        <div>
          <PageLoader />
        </div>
      );
    }

    return <WrappedComponent {...props} /> 
  };

  RequiresAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return RequiresAuth;
}

export default withAuth;
