import React, { useEffect, useRef, useState } from "react";

import NavigationList from "./NavigationList";
import Pin from "./Pin";
import { navs } from "src/lib/mocks";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";
import HiddenNavigationList from "./HiddenNavigationList";
import { cn } from "src/lib/utils";
import { useInView } from "react-intersection-observer";

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

  console.log(entry?.isIntersecting);

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
