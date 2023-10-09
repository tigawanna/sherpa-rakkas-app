import { PageProps, useQueryClient, useSSQ } from "rakkasjs";
import { InternshipForm } from "./components/InternshipForm";
import { internshipApi } from "@/routes/api/helpers/prisma/internship";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";





export default function InternshipPage({params}:PageProps) {
 const qc = useQueryClient();
 const user = qc.getQueryData("user") as LuciaUser;
 const hackathon_id = params.internship as string;

 const query = useSSQ((ctx) => {
   return internshipApi.getOne({
     item_id: hackathon_id,
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
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex w-full  items-center justify-center">
        <InternshipForm default_value={query.data} updating={true} refetch={query.refetch}/>
      </div>
    </div>
  );
}


