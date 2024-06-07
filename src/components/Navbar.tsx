import React, { useEffect } from "react";

import NavigationList from "./NavigationList";
import Pin from "./Pin";
import { navs } from "src/lib/mocks";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";
import HiddenNavigationList from "./HiddenNavigationList";

const Navbar: React.FC = () => {
  const { navigationData, hiddenNavigationData, setNavigationData } =
    useNavbarNavigation();

  useEffect(() => {
    if (!navigationData.length && !hiddenNavigationData.length) {
      localStorage.setItem("navigation", JSON.stringify(navs));
      setNavigationData(JSON.parse(localStorage.getItem("navigation") || "[]"));
    }
  }, [hiddenNavigationData.length, navigationData.length, setNavigationData]);

  return (
    <header className="flex items-center justify-between border-t-[1px]">
      <Pin />
      <NavigationList />
      <HiddenNavigationList />
    </header>
  );
};

export default Navbar;
