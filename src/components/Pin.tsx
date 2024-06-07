import React, { useEffect, useState } from "react";
import { PinIcon, PinOff } from "lucide-react";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";
import { useLocation } from "react-router-dom";
import { cn } from "src/lib/utils";

interface PinProps {
  isHidden: boolean;
}

const Pin: React.FC<PinProps> = ({ isHidden }) => {
  const { navigationData, togglePinState } = useNavbarNavigation();

  const location = useLocation();

  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const currentNavItem = navigationData.find(
      (nav) => nav.href === location.pathname
    );
    if (currentNavItem) {
      setIsPinned(Boolean(currentNavItem.isPinned));
    }
  }, [location.pathname, navigationData]);

  const setPinStateForPath = () => {
    togglePinState(location.pathname);
  };

  return (
    <div
      className={cn(
        "px-3 py-2 border-t-[2.5px] cursor-pointer border-t-transparent",
        isHidden && "opacity-0 pointer-events-none"
      )}
      onClick={setPinStateForPath}
    >
      {isPinned ? (
        <PinOff className="text-gray-600 transform -rotate-[30deg]" />
      ) : (
        <PinIcon className="text-gray-600 transform -rotate-[30deg]" />
      )}
    </div>
  );
};

export default Pin;
