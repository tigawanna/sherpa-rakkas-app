import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Link, usePageContext, useQuery, useSSQ } from "rakkasjs";
import { projectApi } from "@/routes/api/helpers/prisma/projects";
import { Spinner } from "@/components/navigation/Spinner";
import { Suspense } from "react";

interface ProjectsProps {}

export function Projects({}: ProjectsProps) {
  const page_ctx = usePageContext();
  const qc = page_ctx.queryClient;
  const user = qc.getQueryData("user") as LuciaUser;
  const query = useSSQ((ctx) => {
    return projectApi.getAllProjects({ userId:user.userId! });
  });

  if (query.error || ("error" in query?.data)) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }

  const projects = query.data;

  return (
    <div className="relative flex h-full w-full flex-col gap-2 pb-5">
      <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
        {query.isRefetching && (
          <div className="flex h-full  w-full items-center justify-center p-2">
            <span className="loading loading-infinity loading-lg text-warning"></span>
          </div>
        )}

        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          href={`/dashboard/project/new`}
          className="btn btn-outline sticky right-[3%] top-[3%]"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>

      <Suspense fallback={<Spinner size="00px" />}>
        <div className="flex h-full w-full flex-wrap  gap-2 px-5 pb-5 pt-2">
          {projects &&
            projects.map((project) => {
              return <ProjectCard key={project?.id} item={project} />;
            })}
        </div>
      </Suspense>
    </div>
  );
}
