import "./index.css";
import { LayoutProps, useLocation } from "rakkasjs";
import { Nprogress } from "@/components/navigation/nprogress/Nprogress";
import { Toolbar } from "@/components/navigation/Toolbar";

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center ">
      <Nprogress isAnimating={location && location?.pending ? true : false} />
      <Toolbar />
      {children}
    </div>
  );
}
