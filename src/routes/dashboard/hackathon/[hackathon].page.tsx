import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { hackathonApi } from "@/routes/api/helpers/prisma/hackathon";
import { PageProps, useQueryClient, useSSQ } from "rakkasjs";
import { HackathonForm } from "./components/HackathonForm";


export default function HackathonPage({params}:PageProps) {
 
  const qc = useQueryClient();
 const user = qc.getQueryData("user") as LuciaUser
  const hackathon_id = params.hackathon as string;



  const query = useSSQ((ctx) => {
    return hackathonApi.getOne({ item_id: hackathon_id, user_id: user?.userId! });
  })


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
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
      <h1 className="text-2xl font-bold">Update Hackathon</h1>
      <div className="flex h-full w-full items-center justify-center">
        <HackathonForm
          default_value={query.data}
          updating={true}
          refetch={query.refetch}
        />
      </div>
    </div>
  );
}


