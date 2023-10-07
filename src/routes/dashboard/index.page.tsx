import { Link, PageProps, usePageContext } from "rakkasjs";
import { ProfileForm } from "./components/profile/ProfileForm";
import { DashboardTabs } from "./components/DashboardTabs";
export default function DashboadPage({}: PageProps) {
  const ctx = usePageContext();
  const user=ctx.queryClient.getQueryData("user") as LuciaUser
  // console.log("user in dashboard page", user);
  return (
    <div className="w-full h-full min-h-screen bg-base-200 flex flex-col ">
      {/* @ts-expect-error */}
      <ProfileForm user={user} updating={true}/>
      {/* <DashboardTabs/> */}
    </div>
  );
}
