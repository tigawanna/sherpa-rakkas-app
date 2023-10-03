import { Link, PageProps } from "rakkasjs";
export default function DashboadPage({}: PageProps) {
  return (
    <div className="w-full h-full min-h-screen bg-base-200 flex flex-col items-center justify-center">
      Dashboard Page
      <Link href="/auth">Auth</Link>
    </div>
  );
}
