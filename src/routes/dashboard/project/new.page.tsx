import { Suspense, useState } from "react";
import { PageProps,useQueryClient} from "rakkasjs";
import { AddFromGithub } from "./components/github/AddFromGithub";
import { ProjectForm } from "./components/ProjectForm";
import { TProjectInputType } from "@/routes/api/helpers/prisma/projects";
import { SkeletonLoader } from "@/components/navigation/loaders/SkeletonLoader";
import { SpinnerLoader } from "@/components/navigation/loaders/SpinnerLoader";
import { Spinner } from "@/components/navigation/loaders/Spinner";

export default function NewProject({params}: PageProps) {
 const user = useQueryClient().getQueryData("user")


  const [project, setProject] = useState<TProjectInputType>({
    id: "",
    description: "",
    languages: [],
    repoUrl: "",
    image_url: "",
    name: "",
    libraries: [],
    userId: user.id,
  });

  const modal_id = "add_project_from_github";
  return (
    <div className="flex h-full  w-full flex-col items-center justify-center">
  
      <div className="flex w-[95%] flex-col gap-3 p-1 md:w-[80%] md:p-5 lg:w-[60%]">

        <div className="sticky right-[4%] top-[10%]  flex w-full  items-center justify-start ">
          <AddFromGithub
            project={project}
            modal_id={modal_id}
            profile={user}
            setProject={setProject}
          />
        </div>


        <ProjectForm
          project={project}
          key={
            project?.name +
            project?.languages +
            project?.libraries +
            project?.repoUrl
          }
        />
      </div>
    </div>
  );
}
