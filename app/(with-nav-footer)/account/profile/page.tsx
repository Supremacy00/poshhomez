'use client'
import React from "react";
import ProfileLayout from "@/components/profile/profileLayouts/profileLayouts";
import withAuth from "@/utils/withAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PropertyProvider } from "@/contexts/addPropertyContext/AddPropertyContext";
const ProfilePage = () => {
  return (
    <div>
      <PropertyProvider>
        <ProfileLayout />
        <ToastContainer
          className="px-5"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PropertyProvider>
    </div>
  );
};

export default withAuth(ProfilePage);
