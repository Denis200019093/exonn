import { useState } from "react";
import { ChevronDown, CircleX } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { cn } from "src/lib/utils";
import useNavbarNavigation from "src/hooks/useNavbarNavigation";

const HiddenNavigationList: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { hiddenNavigationData, deleteFromHiddenAddToOriginal } =
    useNavbarNavigation();

  const location = useLocation();

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={cn(
          "px-3 py-2 border-t-[2.5px] cursor-pointer border-t-transparent",
          hiddenNavigationData.length
            ? "shadow-lg rounded-md"
            : "cursor-not-allowed"
        )}
      >
        <ChevronDown />
      </button>

      {showDropdown && (
        <div className="absolute right-0">
          <ul className="flex flex-col min-w-44">
            {hiddenNavigationData.map((hiddenNav) => (
              <li
                key={hiddenNav.id}
                className={cn(
                  " bg-gray-50 text-gray-700 cursor-pointer border-t-[2.5px] border-t-transparent hover:bg-gray-100",
                  location.pathname === hiddenNav.href &&
                    "border-t-blue-500 bg-gray-100"
                )}
              >
                <Link
                  to={hiddenNav.href}
                  className="flex items-center justify-between py-1.5 px-2.5"
                >
                  <div>{hiddenNav.title}</div>
                  <CircleX
                    onClick={() => deleteFromHiddenAddToOriginal(hiddenNav.id)}
                    size={16}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HiddenNavigationList;
