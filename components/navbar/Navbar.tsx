import React from "react";
import NavMobile from "./NavMobile";
import NavDesktop from "./NavDesktop";

const Navbar = () => {
  return (
    <nav>
      <NavMobile />
      <NavDesktop />
    </nav>
  );
};

export default Navbar;
