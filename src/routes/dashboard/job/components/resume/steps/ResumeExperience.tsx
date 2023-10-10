import { Plus, X } from "lucide-react";
import { ResumeFields } from "./ResumeMutiStepForm";
import { Link, useSSQ } from "rakkasjs";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";
import { TExperienceInputType, experienceApi } from "@/routes/api/helpers/prisma/experience";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { Suspense, useState } from "react";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { Spinner } from "@/components/navigation/Spinner";

interface ResumeExperienceProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
export function ResumeExperience({user_id,input,setInput}:ResumeExperienceProps){

 const [keyword, setKeyword] = useState("");
 const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);

 const query = useSSQ(
   async (ctx) => {
     return experienceApi.findByField({
       user_id: user_id!,
       fields: ["company", "description"],
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




const isSelected=(id?:string)=>{
  return id&&input.experience.some((val) =>val.id === id);
}
const handleAddItem = ({ id,position,company,from,to }:TExperienceInputType) => {
  setInput((prev)=>{
    if (
      prev.experience.some((val) => {
        return val.id === id;
      })
    ){
      return prev
    }
      return {
        ...prev,
      experience: [
          ...prev.experience,
          { position,company,from,to,id:id! },
        ],
      };
  })
};
const handleRemoveItem = (id?:string) => {
  if(!id) return
  setInput((prev)=>{
    const filtered = prev.experience.filter(item=>item.id!==id)
    return { ...prev,experience:filtered };
  })
};


 const data = query.data;
 

return (
  <div className="flex h-full w-full flex-col items-center justify-center">
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
      <Link href={`/dashboard/experience/new`} className="btn btn-outline">
        <Plus className="h-6 w-6" />
      </Link>
    </div>

    {!data && (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-info">no matches found</div>
      </div>
    )}
    {/* experiences */}
    <Suspense fallback={<Spinner size="100px" />}>
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="flex w-full flex-col justify-center gap-1 rounded-md border 
          p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
          >
            <div className=" flex w-full items-center justify-end">
              {isSelected(item.id) ? (
                <X
                  className="h-6 w-6 text-error"
                  onClick={() => handleRemoveItem(item?.id!)}
                />
              ) : (
                <Plus
                  className="h-6 w-6 text-success"
                  onClick={() => handleAddItem(item)}
                />
              )}
            </div>
            <h3 className="text-2xl font-bold">{item?.company}</h3>
            <h3 className="text-lg">{item?.position}</h3>
            <p className="line-clamp-3">{item?.description}</p>
            <div className=" flex items-center justify-between text-sm">
              <h3>From : {item.from.toISOString().split("T")[0]}</h3>
              <h3>To : {item.to.toISOString().split("T")[0]}</h3>
            </div>
          </div>
        );
      })}
    </div>
              </Suspense>
  </div>
);
}
