import { useState } from "react";
import { GithubGeneratedProjectForm } from "./GithubGeneratedProject";
import { TProjectInputType, projectApi } from "@/routes/api/helpers/prisma/projects";
import { useDebouncedValue } from "@/utils/hooks/debounce";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useQuery } from "rakkasjs";
import { githubApi } from "@/routes/api/helpers/github/github";
import { RepositoryResponse } from "@/routes/api/helpers/github/types";

interface SearchGithubprojectsProps {
  github_username: string;
  modal_id: string;
  setProject: React.Dispatch<React.SetStateAction<TProjectInputType>>;
  project: TProjectInputType;
  direct_create?: boolean;
  addProjectTList?: (project: TProjectInputType) => void;
}

export function SearchGithubprojects({
  github_username,
  setProject,
  project,
  addProjectTList,
  modal_id,
  direct_create = false,
}: SearchGithubprojectsProps) {
  const [keyword, setKeyword] = useState("");
  const [projectToGenerate, setProjectToGenerate] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);



  // const query = api.github.searchRepoByName.useQuery({
  //   owner: github_username,
  //   keyword: debouncedValue,
  // });

    const query = useQuery("github-projects", () =>
      githubApi.searchRepoByName({
        owner: github_username,
        keyword: debouncedValue,
      })
    );
  
  // const project_query = api.github.getProjectFromGithub.useQuery(
  //   {
  //     owner: github_username,
  //     repo: projectToGenerate,
  //   },
  //   {
  //     enabled: projectToGenerate.length > 2,
  //     retry: false,
  //   }
  // );
  const project_query = useQuery("projects", () =>{
  return githubApi.getProjectFromGithub({
    owner: github_username,
    repo: projectToGenerate,
  })
},{
    enabled: projectToGenerate.length > 2,
})

  function handleSelectProject(repo: RepositoryResponse) {
    setProjectToGenerate(repo.name as string);
  }

  function handleChange(e: any) {
    setKeyword(e.target.value);
  }


  if(project_query.data){
    return(
      <GithubGeneratedProjectForm
        project={project}
        generated_project={project_query.data}
        modal_id={modal_id}
        setProject={setProject}
        setProjectToGenerate={setProjectToGenerate}
        addProjectTList={addProjectTList}
        direct_create={direct_create}

      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col  items-center justify-center gap-2">
      <div className=" relative flex w-full items-center justify-center">
        <TheTextInput
          value={keyword}
          field_key={"keyword"}
          field_name="Search"
          onChange={handleChange}
        />
        {(isDebouncing || query.isRefetching) && (
          <div className="absolute top-[20%] flex w-full items-center justify-center p-2">
            <span className="loading loading-infinity loading-lg text-warning"></span>
          </div>
        )}
      </div>

      {query.error && (
        <div className="flex w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-error">
            {query.error.message}
          </div>
        </div>
      )}

      {project_query.error && (
        <div className="flex w-full items-center justify-center p-2">
          <div className="rounded-lg border p-2 text-error">
            {project_query.error.message}
          </div>
        </div>
      )}

      <div className="flex w-full flex-wrap  items-center justify-center gap-2">
        
        {query.data &&
          query.data?.items?.map((project) => {
            return (
              <div
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className="card relative min-h-[100px] w-[95%] cursor-pointer border bg-base-100 shadow-xl  hover:border-accent "
              >
                <div className="flex w-full flex-col gap-1 p-2">
                  <div className="flex w-full  items-center">
                    <h3 className="w-full text-2xl font-bold">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center">
                    {project?.description !== "" && (
                      <div className="flex w-full items-center justify-center">
                        <p className="line-clamp-3 w-full">
                          {project.description}
                        </p>
                      </div>
                    )}
                  </div>
                  {projectToGenerate === project.name &&
                    project_query.isRefetching && (
                      <div className=" absolute flex h-full w-full items-center justify-center bg-base-200 bg-opacity-70">
                        <span className="loading loading-infinity loading-lg text-accent"></span>
                      </div>
                    )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
