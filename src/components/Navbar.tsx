import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Pin from "./Pin";
import { cn } from "src/lib/utils";
import { navs } from "src/lib/mocks";
import NavigationList from "./NavigationList";
import HiddenNavigationList from "./HiddenNavigationList";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";

const Navbar: React.FC = () => {
  const { navigationData, hiddenNavigationData, setNavigationData } =
    useNavbarNavigation();

  useEffect(() => {
    if (!navigationData.length && !hiddenNavigationData.length) {
      localStorage.setItem("navigation", JSON.stringify(navs));
      setNavigationData(JSON.parse(localStorage.getItem("navigation") || "[]"));
    }
  }, [hiddenNavigationData.length, navigationData.length, setNavigationData]);

  const { ref, entry } = useInView({ threshold: 1 });

  return (
    <header
      ref={ref}
      className={cn(
        "flex items-center justify-between border-t-[1px] ",
        !entry?.isIntersecting ? "sticky -top-[1px]" : ""
      )}
    >
      <Pin isHidden={!entry?.isIntersecting} />
      <NavigationList isHidden={!entry?.isIntersecting} />
      <HiddenNavigationList isHidden={!entry?.isIntersecting} />
    </header>
  );
};

export default Navbar;
