import React, { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";
import { NavigationItemTypes } from "src/lib/types";
import { cn } from "src/lib/utils";

interface TestProps {
  nav: NavigationItemTypes;
  index: number;
  isDragging: boolean;
}

const NavigationItem: React.FC<TestProps> = memo(({ nav, isDragging }) => {
  const { navigationData, deleteFromOriginalAddToHidden } =
    useNavbarNavigation();

  const { ref, inView, entry } = useInView({
    threshold: 0.99,
    initialInView: true,
  });
  console.log(entry?.isIntersecting);

  useEffect(() => {
    if (!inView && !isDragging) {
      console.log("wedlewldlweld");

      deleteFromOriginalAddToHidden(
        navigationData[navigationData.length - 1].id
      );
    }
  }, [deleteFromOriginalAddToHidden, inView, isDragging]);

  return (
    <Link
      id={nav.id.toString()}
      to={nav.href}
      ref={ref}
      className={cn(
        "flex items-center gap-2 py-2 px-4 w-full h-full whitespace-nowrap"
      )}
    >
      {nav.title}
    </Link>
  );
});

export default NavigationItem;
