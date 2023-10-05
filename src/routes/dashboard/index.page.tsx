import { Link, PageProps, usePageContext } from "rakkasjs";
export default function DashboadPage({}: PageProps) {
  const ctx = usePageContext();
  const user=ctx.queryClient.getQueryData("user");
  console.log("user in dashboard page", user);
  return (
    <div className="w-full h-full min-h-screen bg-base-200 flex flex-col items-center justify-center">
      Dashboard Page
      <Link href="/auth">Auth</Link>
    </div>
  );
}
