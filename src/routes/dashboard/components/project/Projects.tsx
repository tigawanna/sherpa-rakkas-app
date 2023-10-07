import { Plus} from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Link, usePageContext, useQuery } from "rakkasjs";
import { projectApi } from "@/routes/api/helpers/prisma/projects";

interface ProjectsProps {
  
}

export function Projects({}: ProjectsProps) {
const page_ctx= usePageContext();
const qc = page_ctx.queryClient;
  const profile_id = qc.getQueryData("user").id;
  // const query = api.project.getAll.useQuery({ user_id: profile_id });
  const query = useQuery("projects",()=>{
    return projectApi.getAllProjects({ userId: profile_id });
  });

  if (query.isRefetching) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <span className="loading loading-infinity loading-lg text-warning"></span>
      </div>
    );
  }
  if (query.error) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }
  if (!query.data || (query.data && query.data.length === 0)) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
        <h2 className="text-3xl font-bold">Projects</h2>
        <Link
          href={`/dashboard/project/new`}
          className="btn btn-outline"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>
    );
  }
  const projects = query.data;

return (
    <div className="relative flex h-full w-full  flex-col gap-2 pb-5">
      <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link
          href={`/profile/${profile_id}/project/new`}
          className="btn btn-outline sticky right-[3%] top-[3%]"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>

      <div className="flex h-full w-full flex-wrap  gap-2 px-5 pb-5 pt-2">
        {projects.map((project) => {
          return <ProjectCard key={project.id} item={project} />;
        })}
      </div>
    </div>
  );
}
