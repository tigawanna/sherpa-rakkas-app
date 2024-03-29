import { Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { TProjectInputType, projectApi} from "@/routes/api/helpers/prisma/projects";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheListInput } from "@/components/form/inputs/ListInput";
import { usePageContext, useSSM } from "rakkasjs";


interface GithubGeneratedProjectFormProps {
  generated_project: TProjectInputType;
  direct_create?: boolean;
  addProjectTList?: (project: TProjectInputType) => void;
  setProjectToGenerate: React.Dispatch<React.SetStateAction<string>>;
  setProject: React.Dispatch<React.SetStateAction<TProjectInputType>>;
  modal_id: string;
  project: TProjectInputType;
}

export function GithubGeneratedProjectForm({
  generated_project,
  project,
  setProject,
  setProjectToGenerate,
  addProjectTList,
  direct_create,
  modal_id,
}: GithubGeneratedProjectFormProps) {
  const [generatedProject, setGeneratedProject] = useState(generated_project);
  const page_ctx = usePageContext();
  const qc = page_ctx.queryClient;

  const create_mutation = useSSM<
  Awaited<ReturnType<typeof projectApi.addNew>>,TProjectInputType>(async(ctx,vars)=>{
    return await projectApi.addNew({input:vars});
  })

  function handleCreateproject() {
    if (direct_create) {
      create_mutation
        .mutateAsync(project)
        .then(() => toast("Project added successfully", { type: "success" }))
        .catch((error: any) =>
          toast(error.message, { type: "error", autoClose: false })
        );
    }
    qc.invalidateQueries("projects");
    setProject((prev) => {
      return generatedProject;
    });

    addProjectTList && addProjectTList(generatedProject);
    setProjectToGenerate("");
    const hidden_checkbox = document.getElementById(
      modal_id
    ) as HTMLInputElement;
    if (hidden_checkbox && hidden_checkbox.type === "checkbox") {
      hidden_checkbox.checked = false;
    }
  }

  function handleRejectproject() {
    setProjectToGenerate("");
    const hidden_checkbox = document.getElementById(
      modal_id
    ) as HTMLInputElement;
    if (hidden_checkbox && hidden_checkbox.type === "checkbox") {
      hidden_checkbox.checked = false;
    }
  }
  return (
    <div className="flex h-full w-full flex-col  items-center justify-center gap-4">
      <div className=" flex w-[90%] flex-col items-center justify-center gap-4 p-2 text-success">
        <div className="flex w-full  items-center">
          <h3 className="w-full text-2xl font-bold">{generatedProject.name}</h3>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <TheTextInput
            field_key={"name"}
            field_name="name"
            value={generatedProject.name}
            editing={true}
            onChange={(e) => {
              setGeneratedProject({
                ...generatedProject,
                name: e.target.value,
              });
            }}
          />
          <TheTextInput
            field_key={"repoUrl"}
            field_name="Repository Url"
            value={generatedProject.repoUrl}
            editing={true}
            onChange={(e) => {
              setGeneratedProject({
                ...generatedProject,
                repoUrl: e.target.value,
              });
            }}
          />
          <TheTextAreaInput
            field_key={"description"}
            field_name="Description"
            value={generatedProject.description}
            editing={true}
            onChange={(e) => {
              setGeneratedProject({
                ...generatedProject,
                description: e.target.value,
              });
            }}
          />

          <TheListInput
            editing={true}
            field_name="Languages"
            field_key="languages"
            input={generatedProject}
            setInput={setGeneratedProject}
          />
          <TheListInput
            editing={true}
            field_name="Libraries"
            field_key="libraries"
            input={generatedProject}
            setInput={setGeneratedProject}
          />
        </div>
      </div>

      <span className="flex w-full items-center justify-evenly gap-4">
        <button
          type="button"
          onClick={() => handleCreateproject()}
          className="btn btn-outline"
        >
          <Check className="h-6 w-6 text-success" />
        </button>
        <button
          onClick={() => handleRejectproject()}
          className="btn btn-outline"
        >
          <X className="h-6 w-6 text-error" />
        </button>
      </span>
    </div>
  );
}
