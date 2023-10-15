import { PageProps,useQueryClient, useSSQ } from "rakkasjs";
import { ProjectForm } from "./components/ProjectForm";
import { projectApi } from "@/routes/api/helpers/prisma/projects";
import { Suspense } from "react";
import { Spinner } from "@/components/navigation/loaders/Spinner";


export default function OneProject({ meta, url,params}: PageProps) {
  const qc = useQueryClient();
  const user = qc.getQueryData("user") as LuciaUser;
  // const query = api.project.getOne.useQuery({
  //   id: router.query.project as string,
  // });
const query = useSSQ((ctx) =>projectApi.getOne({item_id:params.project as string,user_id:user.userId!}),
{refetchOnWindowFocus:true}
);

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
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      {query.isRefetching && (
        <span className="loading loading-infinity loading-lg text-warning"></span>
      )}
      
      <Suspense fallback={<Spinner size="100px" variant="loading-infinity" />}>
        <div className="flex w-[95%] flex-col gap-3 p-1 md:w-[80%] md:p-5 lg:w-[60%]">
          <ProjectForm
            user={user_id}
            // @ts-expect-error
            project={query?.data}
            refetch={query.refetch}
            updating={true}
          />
        </div>
      </Suspense>
    </div>
  );
}
