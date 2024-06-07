import { Landmark, LayoutDashboard, PhoneCall } from "lucide-react";
import { NavigationItemTypes } from "./types";

export const navs: NavigationItemTypes[] = [
  {
    id: 1,
    title: "Dashboard",
    href: "/",
    Icon: LayoutDashboard,
    isPinned: false,
  },
  {
    id: 2,
    title: "Banking",
    href: "/banking",
    Icon: Landmark,
    isPinned: false,
  },
  {
    id: 3,
    title: "Telefonie",
    href: "/telefonie",
    Icon: PhoneCall,
    isPinned: false,
  },
  {
    id: 4,
    title: "Accounting",
    href: "/accounting",
    Icon: PhoneCall,
    isPinned: false,
  },
  {
    id: 5,
    title: "Verkauf",
    href: "/verkauf",
    Icon: PhoneCall,
    isPinned: false,
  },
  {
    id: 6,
    title: "Statistik",
    href: "/statistik",
    Icon: PhoneCall,
    isPinned: false,
  },
  {
    id: 7,
    title: "Post Office",
    href: "/post-office",
    Icon: PhoneCall,
    isPinned: false,
  },
  {
    id: 8,
    title: "Administation",
    href: "/administation",
    Icon: PhoneCall,
    isPinned: false,
  },
];
