 import { useRouter } from "next/router";
import { Hackathons } from "~/components/hackathons/hackathons";
import { api } from "~/utils/api";

interface HackathonPageProps {}

export default function HackathonPage({}: HackathonPageProps) {
 const user_id= useRouter().query.id as string
    const query = api.hackathon.getAll.useQuery({
      user_id
    });

    if (query.isLoading) {
      return (
        <div className="flex h-full  w-full items-center justify-center p-2">
          <span className="loading loading-infinity loading-lg text-warning"></span>
        </div>
      );
    }
    if (query.isError) {
      return (
        <div className="flex h-full  w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-error">
            {query.error.message}
          </div>
        </div>
      );
    }
    if (!query.data){
      return (
        <div className="flex h-full  w-full items-center justify-center p-2">
    
        </div>
      );
    }
  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-2 relative">
      <Hackathons />
      </div>
  )
}
