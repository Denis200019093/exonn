import { LucideProps } from "lucide-react";
import react from "react";

export interface NavigationItemTypes {
  id: number;
  title: string;
  href: string;
  Icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>
  >;
  isPinned?: boolean;
}
