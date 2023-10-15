import { UserCircle2 } from "lucide-react";
import { usePageContext, useQueryClient } from "rakkasjs";

interface UserCircleProps {}

export function UserCircle({}: UserCircleProps) {
  const user = useQueryClient().getQueryData("user") as LuciaUser;
  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-full">
      {user.email ? (
        <img
          src={
            "https://tigawanna-portfolio.vercel.app/_next/image?url=%2Fgithub.jpg&w=384&q=75"
          }
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover"
        />
      ) : (
        <UserCircle2 className="w-7 h-7 rounded-full" />
      )}
    </div>
  );
}
