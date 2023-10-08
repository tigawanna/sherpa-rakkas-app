
import { useRouter } from "next/router";
import { HackathonForm } from "~/components/hackathons/HackathonForm";
import { api } from "~/utils/api";

interface HackathonPageProps {}

export default function HackathonPage({}: HackathonPageProps) {
  const router = useRouter();
  const hackathon_id = router.query.hackathon as string;
//   change to Hackathon
  const query = api.hackathon.getOne.useQuery({
    id:hackathon_id,
    user_id:router.query.id as string
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
      <h1 className="text-3xl font-bold">Hackathon</h1>
      <div className="flex h-full w-full items-center justify-center">
        <HackathonForm default_value={query.data} updating={true} />
      </div>
    </div>
  );
}


