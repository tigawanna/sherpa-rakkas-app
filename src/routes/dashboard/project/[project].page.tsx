import { Plus } from "lucide-react";
import { Link, PageProps, useQuery, useQueryClient, useSSQ } from "rakkasjs";

import { ProjectForm } from "../components/project/ProjectForm";
import { projectApi } from "@/routes/api/helpers/prisma/projects";
import { Suspense } from "react";
import { Spinner } from "@/components/navigation/Spinner";


export default function OneProject({ meta, url,params}: PageProps) {
  // const query = api.project.getOne.useQuery({
  //   id: router.query.project as string,
  // });
const query = useSSQ((ctx) =>projectApi.getProjectById({id:params.project as string}));

 const user_id = useQueryClient().getQueryData("user").id

  if (query.error) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2 min-h-[300px]">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="h-fullw-full relative flex flex-col items-center justify-center">
      {query.isRefetching && (
        <span className="loading loading-infinity loading-lg text-warning"></span>
      )}
      <div className="w-[90%] p-5 md:w-[80%] lg:w-[50%] ">
        <Suspense fallback={<Spinner size="00px" variant="loading-infinity" />}>
          <ProjectForm
            user={user_id}
            // @ts-expect-error
            project={query?.data}
            updating={true}
          />
        </Suspense>
      </div>
    </div>
  );
}
