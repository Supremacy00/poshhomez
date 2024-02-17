import React from "react";
import AddProperties from "@/components/properties/addProperties/AddProperties";
import PersonalInfo from "../profileMenuComponents/personalInfo/PersonalInfo";
import PasswordAndSecurity from "../profileMenuComponents/passwordAndSecurity/PasswordAndSecurity";
import MyProperties from "../profileMenuComponents/myProperties/MyProperties";
import Wishlist from "../profileMenuComponents/wishlist/Wishlist";
import Reviews from "../profileMenuComponents/reviews/Reviews";
import Notifications from "../profileMenuComponents/notifications/Notifications";
import Help from "../profileMenuComponents/help/Help";
import { MenuComponentMapProp } from "@/@types";
import { useContentMenu } from "../ProfileContentMenuContext";


const ProfileMainContent: React.FC = () => {
  const { contentMenu } = useContentMenu();

  const menuComponentMap: MenuComponentMapProp = {
    "Add New Properties": AddProperties,
    "Personal Info": PersonalInfo,
    "Password & Security": PasswordAndSecurity,
    "My Properties": MyProperties,
    Wishlist: Wishlist,
    Reviews: Reviews,
    Notifications: Notifications,
    Help: Help,
  };

  const SelectedComponent = menuComponentMap[contentMenu] || null;

  return (
    <main className="px-4 mt-5 lg:mt-0 xxl:px-0">
      {SelectedComponent ? <SelectedComponent /> : <p>No component selected</p>}
    </main>
  );
};

export default ProfileMainContent;