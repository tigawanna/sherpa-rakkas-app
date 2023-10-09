import {  PageProps, useQueryClient, useSSQ } from "rakkasjs";
import { JobApplicationForm } from "./components/JobApplicationForm";
import { jobApplicationApi } from "@/routes/api/helpers/prisma/job-application";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";

export default function ApplicationPage({params}:PageProps) {

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
      <div className="flex flex-col h-full w-full items-center justify-center">
        <JobApplicationForm default_value={query.data} updating={true} />
        </div>
    </div>
  );
}
