import { MenuIcon } from "lucide-react";
import { DashBoardLinks } from "./DashBoardLinks";
import { Link } from "rakkasjs";
import { CurrentUserSection } from "@/components/navigation/CurrentUserSection";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";

interface LayoutDrawerProps {

}

export function DashboardSidebar({}:LayoutDrawerProps){

return (
  <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
      <label htmlFor="my-drawer" className="drawer-button">
        <MenuIcon className="w-7 h-7" />
      </label>
    </div>
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay "
      ></label>
      <div className="flex flex-col gap-1 z-50">
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>
        <ThemeToggle />
        <DashBoardLinks />
        <CurrentUserSection  />
      </div>
      
    </div>
  </div>
);
}
