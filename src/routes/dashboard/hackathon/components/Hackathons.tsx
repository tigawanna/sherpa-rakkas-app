import { Link2, Plus } from "lucide-react";
import { HackathonCard } from "./HackathonCard";
import { Link, useQueryClient, useSSQ } from "rakkasjs";
import {
  THackathonInputType,
  hackathonApi,
} from "@/routes/api/helpers/prisma/hackathon";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { Suspense, useState } from "react";
import { Spinner } from "@/components/navigation/Spinner";

interface HackathonsProps {}

export function Hackathons({}: HackathonsProps) {
  const qc = useQueryClient();
  const { userId } = qc.getQueryData("user") as LuciaUser;
  const [keyword, setKeyword] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

  const query = useSSQ(
    async (ctx) => {
      return hackathonApi.findByName({
        user_id: userId!,
        item_name: debouncedValue,
      });
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  if (query.error || (query.data && "error" in query.data)) {
    return <ReturnedUseQueryEror data={query.data} error={query.error} />;
  }

  const data = query.data;
  const refetch = query.refetch;

  function handleChange(e: any) {
    setKeyword(e.target.value);
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-2 pb-5">
      <div className="sticky top-[5%] flex flex-wrap w-full items-center justify-evenly p-2 gap-3">
        <h3 className="text-2xl font-bold ">hackathons</h3>
        <div className=" relative flex md:min-w-[50%] min-w-[70%]  items-center justify-center gap-1">
          <TheTextInput
            label_classname="hidden"
            value={keyword}
            field_key={"keyword"}
            placeholder="Search for project"
            field_name="Search"
            onChange={handleChange}
          />
          {(query.isRefetching || isDebouncing) && (
            <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
              <span className="loading loading-infinity loading-lg text-warning"></span>
            </div>
          )}
        </div>
        <Link href={`/dashboard/hackathon/new`} className="btn btn-outline">
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      {!data && (
        <div className="flex h-full  w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-info">
            no matches found
          </div>
        </div>
      )}
      <div className="flex h-full w-full flex-wrap items-center justify-center gap-5">
        <Suspense fallback={<Spinner size="100px" />}>
          {data &&
            data.map((item) => {
              return (
                <HackathonCard key={item.id} item={item} refetch={refetch} />
              );
            })}
        </Suspense>
      </div>
    </div>
  );
}
