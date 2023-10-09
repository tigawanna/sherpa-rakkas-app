import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { contentApi } from "@/routes/api/helpers/prisma/content";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { Plus } from "lucide-react";
import { Link, useQueryClient, useSSQ } from "rakkasjs";
import { useState } from "react";
import { ContentCard } from "./ContentCard";


interface ContentsProps {

}

export function Contents({}:ContentsProps){
const qc = useQueryClient();
  const { userId } = qc.getQueryData("user") as LuciaUser;
  const [keyword, setKeyword] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

  const query = useSSQ(
    async (ctx) => {
      return contentApi.findByField({
        user_id: userId!,
        fields: [ "title"],
        keyword: debouncedValue,
      });
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    }
  );

  if (query.error || (query.data && "error" in query.data)) {
    return <ReturnedUseQueryEror data={query.data} error={query.error} />;
  }


  function handleChange(e: any) {
    setKeyword(e.target.value);
  }


  const data = query.data;
  const refetch = query.refetch;

return (
  <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-5">
    
    <div className="sticky top-[5%] flex w-full flex-wrap items-center justify-evenly gap-3 p-2">
      <h3 className="text-2xl font-bold ">Content</h3>
      <div className=" relative flex min-w-[70%] items-center  justify-center gap-1 md:min-w-[50%]">
        <TheTextInput
          label_classname="hidden"
          value={keyword}
          field_key={"keyword"}
          placeholder="Search"
          field_name="Search"
          onChange={handleChange}
        />
        {(query.isRefetching || isDebouncing) && (
          <div className="absolute  flex w-full items-center justify-center gap-3 p-2">
            <span className="loading loading-infinity loading-lg text-warning"></span>
          </div>
        )}
      </div>
      <Link href={`/dashboard/content/new`} className="btn btn-outline">
        <Plus className="h-6 w-6" />
      </Link>
    </div>

    <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
      {data &&
        data.map((item) => {
          return (
            <ContentCard item={item} refetch={refetch} key={item.id}/>
          );
        })}
    </div>
  </div>
);
}
