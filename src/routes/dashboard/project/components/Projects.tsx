import { Plus } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Link, usePageContext, useQuery, useSSQ } from "rakkasjs";
import { projectApi } from "@/routes/api/helpers/prisma/projects";
import { Spinner } from "@/components/navigation/Spinner";
import { Suspense, useState } from "react";
import { prisma } from "@/lib/db/prisma";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";


interface ProjectsProps {}

export function Projects({}: ProjectsProps) {
  const page_ctx = usePageContext();
  const qc = page_ctx.queryClient;
  const { userId } = qc.getQueryData("user") as LuciaUser;
  const [keyword, setKeyword] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  const query = useSSQ(
    (ctx) => {
      return projectApi.findByName({ user_id:userId!,item_name: debouncedValue });
      },
    { refetchOnWindowFocus: true,  }

  );

  if (query.error || ("error" in query?.data)) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }
  function handleChange(e: any) {
    setKeyword(e.target.value);
  }
  const projects = query.data;

  return (
    <div className="relative flex h-full w-full flex-col gap-2 pb-5">
      <div className="sticky top-[5%] flex flex-wrap w-full items-center justify-evenly p-2 gap-3">
      <h2 className="text-2xl font-bold">Projects</h2>
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
        <Link
          href={`/dashboard/project/new`}
          className="btn btn-outline sticky right-[3%] top-[3%]"
        >
          <Plus className="h-6 w-6" />
        </Link>
        
      </div>

      <Suspense fallback={<Spinner size="00px" />}>
        <div className="flex h-full w-full flex-wrap  gap-2 px-5 pb-5 pt-2">
          {projects &&
            projects.map((project) => {
              // @ts-expect-error
            return <ProjectCard key={project?.id} item={project} />;
            })}
        </div>
      </Suspense>
    </div>
  );
}
