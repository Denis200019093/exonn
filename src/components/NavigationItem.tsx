import { Link } from "react-router-dom";
import React, { memo, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "src/lib/utils";
import { NavigationItemTypes } from "src/lib/types";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";

interface NavigationItemProps {
  nav: NavigationItemTypes;
  isDragging: boolean;
  horizontalScrollBarVisible: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = memo(
  ({ nav, isDragging, horizontalScrollBarVisible }) => {
    const { navigationData, deleteFromOriginalAddToHidden } =
      useNavbarNavigation();

    const { ref, inView, entry } = useInView({
      threshold: 0.99,
      initialInView: true,
    });

    useEffect(() => {
      if (!inView && !isDragging && horizontalScrollBarVisible) {
        deleteFromOriginalAddToHidden(
          navigationData[navigationData.length - 1].id
        );
      }
    }, [
      deleteFromOriginalAddToHidden,
      inView,
      isDragging,
      horizontalScrollBarVisible,
    ]);

    return (
      <Link
        id={nav.id.toString()}
        to={nav.href}
        ref={ref}
        className={cn(
          "flex items-center gap-2 py-2 px-4 w-full h-full whitespace-nowrap",
          !entry?.isIntersecting && "sticky-hidden"
        )}
      >
        {nav.title}
      </Link>
    );
  }
);

export default NavigationItem;
