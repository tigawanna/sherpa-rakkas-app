import { useState } from "react";
import { TProjectInputType, projectApi } from "../components/project/api";
import { PageProps, useQuery, useQueryClient } from "rakkasjs";
import { AddFromGithub } from "../components/project/AddFromGithub";
import { ProjectForm } from "../components/project/ProjectForm";

export default function NewProject({params}: PageProps) {
 const user_id = useQueryClient().getQueryData("user").id
  // const query = api.profile.getOne.useQuery({ id: router.query.id as string });
  const query = useQuery("project", () =>projectApi.getProjectById({id:user_id}));

  const [project, setProject] = useState<TProjectInputType>({
    id: "",
    description: "",
    languages: [],
    repoUrl: "",
    image_url: "",
    name: "",
    libraries: [],
    userId: query.data?.id,
  });
  if (query.isRefetching) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <span className="loading loading-infinity loading-lg text-warning"></span>
      </div>
    );
  }
  if (query.error) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-error">
          {query.error.message}
        </div>
      </div>
    );
  }
  // console.log("project === ",project)
  const modal_id = "add_project_from_github";
  return (
    <div className="h-full w-full  flex flex-col items-center justify-center">
      {query.data && (
          <div className="sticky top-[10%] right-[4%]  flex w-full  items-center justify-start ">
        <AddFromGithub
          project={project}
          modal_id={modal_id}
          // @ts-expect-error
          profile={query?.data}
          setProject={setProject}
        />
        </div>
      )}
      <div className="w-[90%] p-5 md:w-[80%] lg:w-[50%] ">
        <ProjectForm
          user={user_id}
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
