import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { NavigationItemTypes } from "src/lib/types";

interface NavbarNavigationStore {
  navigationData: NavigationItemTypes[];
  hiddenNavigationData: NavigationItemTypes[];
  setNavigationData: (navs: NavigationItemTypes[]) => void;
  deleteFromOriginalAddToHidden: (id: number) => void;
  deleteFromHiddenAddToOriginal: (id: number) => void;

  togglePinState: (navId: string) => void;
  updateNavigationOrder: (srcIndex: number, destIndex: number) => void;
}

const useNavbarNavigation = create(
  persist<NavbarNavigationStore>(
    (set) => ({
      navigationData: [],
      hiddenNavigationData: [],
      setNavigationData: (navs) => set({ navigationData: navs }),
      togglePinState: (pathname) =>
        set((state) => {
          const updatedNavigationData = state.navigationData.map((nav) =>
            nav.href === pathname ? { ...nav, isPinned: !nav.isPinned } : nav
          );
          return { navigationData: updatedNavigationData };
        }),

      deleteFromOriginalAddToHidden: (navId: number) =>
        set((state) => {
          const copiedHidden = [...state.hiddenNavigationData];

          const deletedNavItem = state.navigationData.find(
            (nav) => nav.id === navId
          );

          const updatedSourceData = state.navigationData.filter(
            (nav) => nav.id !== navId
          );

          if (deletedNavItem) {
            copiedHidden.push(deletedNavItem);
          }

          return {
            navigationData: updatedSourceData,
            hiddenNavigationData: copiedHidden,
          };
        }),

      deleteFromHiddenAddToOriginal: (navId: number) =>
        set((state) => {
          const copiedOriginal = [...state.navigationData];

          const updatedSourceData = state.hiddenNavigationData.filter(
            (nav) => nav.id !== navId
          );

          const deletedNavItem = state.hiddenNavigationData.find(
            (nav) => nav.id === navId
          );

          if (deletedNavItem) {
            copiedOriginal.push(deletedNavItem);
          }

          return {
            navigationData: copiedOriginal,
            hiddenNavigationData: updatedSourceData,
          };
        }),
      updateNavigationOrder: (srcIndex, destIndex) =>
        set((state) => {
          const newItems = [...state.navigationData];
          const [removed] = newItems.splice(srcIndex, 1);
          newItems.splice(destIndex, 0, removed);

          return { navigationData: newItems };
        }),
    }),
    {
      name: "navigation",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useNavbarNavigation;
