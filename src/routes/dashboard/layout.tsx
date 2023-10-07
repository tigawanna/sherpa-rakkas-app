import { LayoutProps, Link, StyledLink } from "rakkasjs";
import { DashboardSidebar } from "./components/LayoutDrawer";
import { DashBoardLinks } from "./components/DashBoardLinks";
export default function DashboardLayout({ children,url }: LayoutProps) {
  console.log(url.pathname)


  return (
    <div className="w-full h-full min-h-screen  flex">
      <div className="h-full sticky top-10  hidden md:flex bg-base-300">
        <DashBoardLinks />
      </div>
      <div className="fixed top-10 left-1 z-50  md:hidden bg-base-300">
        <DashboardSidebar />
      </div>

      {children}
    </div>
  );
}
