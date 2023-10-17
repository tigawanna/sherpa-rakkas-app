import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { jobApplicationApi } from "@/routes/api/helpers/prisma/job-application";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { Plus } from "lucide-react";
import { Link, useQueryClient, useSSQ } from "rakkasjs";
import { Suspense, useState } from "react";
import { JobApplicationCard } from "./JobApplicationCard";
import { Spinner } from "@/components/navigation/loaders/Spinner";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";


interface JobApplicationsProps {

}

export function JobApplications({}:JobApplicationsProps){
const qc = useQueryClient();
const { userId:user_id } = qc.getQueryData('user') as LuciaUser;
console.log(user_id);
const [keyword, setKeyword] = useState("");
const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

const query = useSSQ(
  async (ctx) => {
    
    return jobApplicationApi.findByField({
      user_id: user_id!,
      fields: ["job_title","description"],
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
  <div className="flex h-full w-full flex-col items-center justify-center gap-3 ">
    {/* header + search bar + add new link */}
    <div className="sticky top-[5%] flex w-full flex-wrap items-center justify-evenly gap-3 p-2">
      <h3 className="text-2xl font-bold ">Job Application</h3>
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
      <Link href={`/dashboard/job/new`} className="btn btn-outline">
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
    {/* contents */}

  <Suspense fallback={<Spinner size="100px"/>}>
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-2">
      {data &&
        data.map((item) => {
          if(item.id){
            return <JobApplicationCard key={item.id} item={{...item,id:item.id}} refetch={refetch}/>;
            }
        })}
    </div>
  </Suspense> 
  </div>
);
}
