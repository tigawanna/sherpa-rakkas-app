import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { internshipApi } from "@/routes/api/helpers/prisma/internship";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { Plus } from "lucide-react";
import { Link, useQueryClient, useSSQ } from "rakkasjs";
import { useState } from "react";



import { InternshipCard } from "./InternshipCard";


interface InternshipsProps {

}

export function Internships({}:InternshipsProps){
  
  const qc = useQueryClient();
  const { userId } = qc.getQueryData("user") as LuciaUser;
  const [keyword, setKeyword] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

  const query = useSSQ(
    async (ctx) => {
      return internshipApi.findByField({
        user_id: userId!,
        keyword: debouncedValue,
        fields: ['company', 'description', 'role'],
      });
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
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
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 ">


      <div className="sticky top-[5%] flex flex-wrap w-full items-center justify-evenly p-2 gap-3">
        <h3 className="text-2xl font-bold ">internships</h3>
        <div className=" relative flex md:min-w-[50%] min-w-[70%]  items-center justify-center gap-1">
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
        <Link href={`/dashboard/internship/new`} className="btn btn-outline">
          <Plus className="h-6 w-6" />
        </Link>
      </div>


    <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
      {data &&
        data.map((item) => {
          return (
            <InternshipCard item={item} refetch={refetch} key={item.id}/>
          );
        })}
    </div>
  </div>
);
}
