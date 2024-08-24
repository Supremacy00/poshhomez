'use client'
import React from "react";
import Notifications from "@/components/notifications/Notifications";
import withAuth from "@/utils/withAuth";

const page = () => {
  return (
    <div className="w-full bg-custom4">
      <Notifications />
    </div>
  );
};

export default withAuth(page);
