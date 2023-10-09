import { PageProps, useQueryClient, useSSQ } from "rakkasjs";
import { ExperienceForm } from "./components/ExperienceForm";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { experienceApi } from "@/routes/api/helpers/prisma/experience";


export default function ExperiencePage({params}:PageProps) {
    const qc = useQueryClient();
    const user = qc.getQueryData("user") as LuciaUser;
    const experience_id =params.experience as string;

  const query = useSSQ((ctx) => {
    return experienceApi.getOne({
      item_id: experience_id,
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
      <div className="flex w-[95%] flex-col gap-3 p-1 md:w-[80%] md:p-5 lg:w-[60%]">
        <ExperienceForm default_value={query.data} updating={true} />
      </div>
    </div>
  );
}


