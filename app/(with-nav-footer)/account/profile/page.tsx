"use client";
import React from "react";
import ProfileLayout from "@/components/profile/profileLayouts/profileLayouts";
import withAuth from "@/utils/withAuth";
import { Toaster } from "sonner";
import { PropertyProvider } from "@/contexts/addPropertyContext/AddPropertyContext";
const ProfilePage = () => {
  return (
    <div>
      <PropertyProvider>
        <ProfileLayout />
        <Toaster
          className="px-5"
          position="top-right"
          richColors
          duration={3500}
        />
      </PropertyProvider>
    </div>
  );
};

export default withAuth(ProfilePage);
