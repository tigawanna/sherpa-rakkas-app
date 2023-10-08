import { Link2, Plus } from "lucide-react";
import { HackathonCard } from "./HackathonCard";
import { Link, useQueryClient, useSSQ } from "rakkasjs";
import { THackathonInputType, hackathonApi } from "@/routes/api/helpers/prisma/hackathon";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";

interface HackathonsProps {

}

export function Hackathons({}:HackathonsProps){
  const qc= useQueryClient();
  const user = qc.getQueryData("user")as LuciaUser

 const query = useSSQ(async(ctx)=>{
    return hackathonApi.getAll({ user_id: user.userId! });
  })

  if (query.error || (query.data && "error" in query.data)) {
    return <ReturnedUseQueryEror data={query.data} error={query.error} />;
  }


     if (!query.data) {
       return (
         <div className="flex h-full  w-full items-center justify-center p-2">
           <div className="rounded-lg border p-2 text-info">
             no matches found
           </div>
         </div>
       );
     }
const data = query.data;
return (
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-2 pb-5">
    <div className="sticky top-[5%] flex w-full items-center justify-between p-2">
      <h3 className="text-2xl font-bold ">hackathons</h3>
      <Link
        href={`/dashboard/hackathon/new`}
        className="btn btn-outline"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
      {data &&
        data.map((item) => {
          return (
              <HackathonCard key={item.id} item={item}/>
          );
        })}
    </div>
  </div>
);
}
