import "./index.css";
import { LayoutProps, useLocation } from "rakkasjs";
import { Nprogress } from "@/components/navigation/nprogress/Nprogress";
import { Toolbar } from "@/components/navigation/Toolbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center ">
      <Nprogress isAnimating={location && location?.pending ? true : false} />
      <Toolbar />
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
