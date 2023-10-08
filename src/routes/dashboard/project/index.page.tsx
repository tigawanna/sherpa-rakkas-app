import { Spinner } from "@/components/navigation/Spinner";
import { Suspense } from "react";
import { Projects } from "../components/project/Projects";

interface ProjectPageProps {
  
}

export default function ProjectPage({}:ProjectPageProps) {

return (
  <div className="flex h-fullw-full flex-col items-center justify-center relative">
    <Suspense fallback={
      <div className="flex h-full w-full items-center justify-center p-2">
      <span className="loading loading-infinity loading-lg text-warning">
        </span>
      </div>}>
      <Projects />
    </Suspense>
    {/* <Spinner size="00px"/> */}

  </div>
);
}
