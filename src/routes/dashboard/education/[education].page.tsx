import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { educationApi } from "@/routes/api/helpers/prisma/education";
import { PageProps, useQueryClient, useSSQ } from "rakkasjs";
import { EducationForm } from "./components/EducationForm";


export default function EducationPage({params}:PageProps) {
    const qc = useQueryClient();
    const user = qc.getQueryData("user") as LuciaUser;
    const content_id = params.education as string;

    const query = useSSQ((ctx) => {
      return educationApi.getOne({
        item_id: content_id,
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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-[95%] flex-col gap-3 p-1 md:w-[80%] md:p-5 lg:w-[60%]">
        <EducationForm
          default_value={query.data}
          updating={true}
          refetch={query.refetch}
        />
      </div>
    </div>
  );
}


