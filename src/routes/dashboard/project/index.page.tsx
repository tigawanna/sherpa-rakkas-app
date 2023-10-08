import { Spinner } from "@/components/navigation/Spinner";
import { Suspense } from "react";
import { Projects } from "../components/project/Projects";

interface ProjectPageProps {
  
}

export default function ProjectPage({}:ProjectPageProps) {

return (
  <div className="flex h-full min-h-screen w-full flex-col items-center justify-center relative">

      <Projects />

    {/* <Spinner size="00px"/> */}

  </div>
);
}
