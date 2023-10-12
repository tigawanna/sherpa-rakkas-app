import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { jobApplicationApi } from "@/routes/api/helpers/prisma/job-application";
import { PageProps, useQueryClient, useSSQ } from "rakkasjs"
import { MainJobApplicationForm } from "./components/MainJobApplicationForm";

export default function JobApplicationPage({params}:PageProps) {
    const qc = useQueryClient();
    const user = qc.getQueryData("user") as LuciaUser;
    const job_id =params.job as string;
    

  const query = useSSQ((ctx) => {
    return jobApplicationApi.getOne({
      item_id: job_id,
      user_id: user?.userId!,
    });
  });

  if (query.error || (query.data && "error" in query.data)) {
    return <ReturnedUseQueryEror data={query.data} error={query.error} />;
  }


  if (!query.data) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-3xl text-warning">
          no matches found
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-full w-full items-center justify-center">
        <MainJobApplicationForm default_value={query.data} updating={true} />
    </div>
  );
}
