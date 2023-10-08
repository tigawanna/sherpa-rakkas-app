import { useState } from "react";
import { PageProps,useQueryClient} from "rakkasjs";
import { AddFromGithub } from "../components/project/github/AddFromGithub";
import { ProjectForm } from "../components/project/ProjectForm";
import { TProjectInputType } from "@/routes/api/helpers/prisma/projects";

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
    <div className="h-full w-full  flex flex-col items-center justify-center">
      <div className="w-[90%] p-5 md:w-[80%] lg:w-[50%] flex flex-col gap-3">
        <div className="sticky top-[10%] right-[4%]  flex w-full  items-center justify-start ">
          <AddFromGithub
            project={project}
            modal_id={modal_id}
            profile={user}
            setProject={setProject}
          />
        </div>
        <ProjectForm
          user={user.id}
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
