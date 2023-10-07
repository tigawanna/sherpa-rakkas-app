import { Plus } from "lucide-react";
import { Link, PageProps, useQuery, useQueryClient } from "rakkasjs";
import { projectApi } from "../components/project/api";
import { ProjectForm } from "../components/project/ProjectForm";


export default function OneProject({ meta, url,params}: PageProps) {
  // const query = api.project.getOne.useQuery({
  //   id: router.query.project as string,
  // });
const query = useQuery("project", () =>projectApi.getProjectById({id:params.project as string}));
 const user_id = useQueryClient().getQueryData("user").id
  if (query.isRefetching) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2 min-h-[300px]">
        <span className="loading loading-infinity loading-lg text-warning"></span>
      </div>
    );
  }
  if (query.error) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2 min-h-[300px]">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }
  if(!query.data){
    return (
      <div className="flex h-full  min-h-[300px] w-full items-center justify-center p-2">
        <div className="flex  flex-col items-center justify-center gap-2 rounded-lg p-2  text-warning">
          <h2 className="text-2xl font-bold">No matches found</h2>

          <Link
            className="btn btn-outline text-accent"
            href={`/project/new`}
          >
            <Plus className="h-6 w-6" />
          </Link>
        </div>
      </div>
    );
  }
  const modal_id = "add_project_from_github";
  return (
    <div className="h-fullw-full relative flex flex-col items-center justify-center">
      <div className="w-[90%] p-5 md:w-[80%] lg:w-[50%] ">
        <ProjectForm
          user={user_id}
          // @ts-expect-error
          project={query.data}
          updating={true}
        />
      </div>
    </div>
  );
}
