import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { THackathonInputType, hackathonApi } from "@/routes/api/helpers/prisma/hackathon";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { Plus, X } from "lucide-react";
import { Link, useQuery, useSSQ } from "rakkasjs";
import { Suspense, useState } from "react";



import { ResumeFields } from "./ResumeMutiStepForm";
import { useQueryFetcher } from "@/utils/async";
import { Spinner } from "@/components/navigation/loaders/Spinner";


interface ResumeHackathonsProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export function ResumeHackathons({
  user_id,
  input,
  setInput,
}: ResumeHackathonsProps) {

  const [keyword, setKeyword] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

  const query = useQuery<Awaited<ReturnType<typeof hackathonApi.findByName>>>(
    'hackathons' + debouncedValue,
    (ctx) => {
      return useQueryFetcher(ctx, '/api/hackathon', {
        user_id,
        keyword: debouncedValue,
      });
    },
    { refetchOnWindowFocus: true, refetchOnMount: true },
  );

  if (query.error || (query.data && "error" in query.data)) {
    return <ReturnedUseQueryEror data={query.data} error={query.error} />;
  }


  

  function handleChange(e: any) {
    setKeyword(e.target.value);
  }
  




  const isSelected = (id?: string) => {
    if(id){
      return input.hackathons.some((val) => {
        return val.id === id;
      });
    }
    return false
  };
  const handleAddItem = ({
    id,
    name,
    description,
    technologies,
  }: THackathonInputType) => {
    setInput((prev) => {
      if (id && prev.hackathons.some((val) => val.id === id)) {
        return prev;
      }
      return {
        ...prev,
        hackathons: [
          ...prev.hackathons,
          { id:id as string, name, description, technologies },
        ],
      };
    });
  };
  const handleRemoveItem = ({ name }: THackathonInputType) => {
    setInput((prev) => {
      const filterd_hackathons = prev.hackathons.filter(
        (item) => item.name !== name
      );
      return { ...prev, hackathons: filterd_hackathons };
    });
  };
  
  const thons = query.data;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/*  header + search bar + add new link */}
      <div className="sticky top-[5%] flex w-full flex-wrap items-center justify-evenly gap-3 p-2">
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
        <Link href={`/dashboard/hackathon/new`} className="btn btn-outline">
          <Plus className="h-6 w-6" />
        </Link>
      </div>
      {/*  hackathons list */}
       <Suspense fallback={<Spinner   size="100px"/>}>
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {thons&&thons.map((item) => {
          return (
            <div
              key={item.id}
              className="flex w-full flex-col justify-center gap-1 rounded-md border 
                p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
            >
              <div className=" flex w-full items-center justify-end">
                {isSelected(item?.id) ? (
                  <X
                    className="h-6 w-6 text-error"
                    onClick={() => handleRemoveItem(item)}
                  />
                ) : (
                  <Plus
                    className="h-6 w-6 text-success"
                    onClick={() => handleAddItem(item)}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <h3 className="line-clamp-3">{item.description}</h3>
              <div className="flex w-full flex-wrap gap-2 p-1">
                {item?.technologies &&
                  item?.technologies.map((tech) => (
                    <h2
                      key={tech}
                      className="rounded-xl border border-accent px-2"
                    >
                      {tech}
                    </h2>
                  ))}
              </div>

              <div className=" flex w-[90%] items-center justify-between border-t border-t-accent text-sm">
               <h3>From : {new Date(item.from).toISOString().split("T")[0]}</h3>
                <h3>To : {new Date(item.to).toISOString().split("T")[0]}</h3>
              </div>
            </div>
          );
        })}
      </div>
       </Suspense>
    </div>
  );
}
