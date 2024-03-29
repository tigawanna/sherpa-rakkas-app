import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import { TProjectInputType, projectApi } from "@/routes/api/helpers/prisma/projects";
import { useFormHook } from "@/components/form/useForm";
import { ThePicUrlInput } from "@/components/form/ThePicUrlInput";
import { TheListInput } from "@/components/form/inputs/ListInput";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { navigate, usePageContext, useSSM } from "rakkasjs";
import { handleMutationResponse } from "@/utils/async";
import { FormHeader } from "@/components/form/inputs/FormHeader";

interface ProjectFormProps {
project?:TProjectInputType
    updating?:boolean;
    refetch?:()=>void
}

export function ProjectForm({project,updating,refetch}: ProjectFormProps) {

const page_ctx= usePageContext()
const qc = page_ctx.queryClient;
const user = qc.getQueryData("user") as LuciaUser;
// const create_mutation = api.project.addNew.useMutation();
// const update_mutation = api.project.updateOne.useMutation();

const create_mutation = useSSM<
  Awaited<ReturnType<typeof projectApi.addNew>>,
  TProjectInputType
>(async (ctx, vars) => {
  return await projectApi.addNew({input:vars});
});
const update_mutation = useSSM<
Awaited<ReturnType<typeof projectApi.updateOne>>,TProjectInputType&{id:string}>(async(ctx,vars)=>{
  return await projectApi.updateOne({input:vars,user_id:user.userId!});

})
// const query = api.profile.getOne.useQuery({ id: router.query.id as string });
function getId(){
  if(updating && project?.id && project?.id.length > 5){
    return project.id
  }
}
const { handleChange, input, setError, setInput, validateInputs } =
  useFormHook<TProjectInputType>({
    initialValues: {
        id:getId(),
        name:project?.name??"",
        description:project?.description??"",
        libraries:project?.libraries??[],
        languages:project?.languages??[],
        repoUrl:project?.repoUrl??"",
        image_url:project?.image_url??"",
        userId:project?.userId??user.userId!,
    },
  });


const [editing, setEditing] = useState(!updating);
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  e.stopPropagation();

  if (editing) {
    if (updating) {
      update_mutation
        .mutateAsync({...input,id:project?.id!})
        .then((res) =>{ 
          handleMutationResponse({
            res,
          })

          refetch?.()
        }
        )

        .catch((error) =>
          toast(error.message, { type: "error", autoClose: false })
        );
    } else {
      create_mutation
        .mutateAsync(input)
        .then((res) => {
          if(res && "error" in res){
              toast(res.error.message, { type: "error", autoClose: false });
          }else{
            toast("Project added successfully", { type: "success" })
            qc.invalidateQueries("projects");
            navigate("/dashboard/project");
          }
        })
        .catch((error) =>
          toast(error.message, { type: "error", autoClose: false })
        );
    }
  }
}

  return (
    <div className="flex h-full w-full  flex-col items-center justify-center rounded-md border p-2 shadow shadow-accent">
      <div className="sticky top-10 flex w-full justify-end px-5">
        <Edit
          className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center gap-4"
      >
        <FormHeader editing={editing} updating={updating} name="Project" />

        <TheTextInput<TProjectInputType>
          field_key={"name"}
          field_name={"Name"}
          value={input["name"]}
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<TProjectInputType>
          field_name={"Description"}
          field_key="description"
          value={input["description"]}
          className="min-h-[200px]"
          onChange={handleChange}
          editing={editing}
        />

        <TheTextInput<TProjectInputType>
          field_key={"repoUrl"}
          field_name={"Github Url"}
          value={input["repoUrl"]}
          type="url"
          onChange={handleChange}
          editing={editing}
        />

        {/* image */}
        <ThePicUrlInput
          img_url={input.image_url ?? ""}
          className=""
          editing={editing}
          setInputImage={(url) =>
            setInput((prev) => {
              return {
                ...prev,
                image_url: url ?? "",
              };
            })
          }
        />
        <TheTextInput<TProjectInputType>
          field_key={"image_url"}
          field_name={"Image Url"}
          value={input["image_url"]}
          type="url"
          onChange={handleChange}
          editing={editing}
        />

        <div className=" flex w-full flex-wrap items-center justify-center gap-5 lg:flex-row">
          <TheListInput
            editing={editing}
            field_name="Languages"
            field_key="languages"
            input={input}
            setInput={setInput}
          />

          <TheListInput
            editing={editing}
            field_name="Libraries"
            field_key="libraries"
            input={input}
            setInput={setInput}
          />
        </div>

        {create_mutation?.data && "error" in create_mutation?.data && (
          <div className="rounded-lg border p-2 text-error">
            {create_mutation?.data?.error?.message}
          </div>
        )}
        {update_mutation?.data && "error" in update_mutation?.data && (
          <div className="rounded-lg border p-2 text-error">
            {update_mutation?.data?.error?.message}
          </div>
        )}

        {editing && (
          <div className="flex w-full items-center justify-center">
            <button className="btn btn-sm btn-outline mt-2 w-[80%] text-accent sm:w-[70%] md:w-[40%]">
              {create_mutation.isLoading || update_mutation.isLoading ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                <div></div>
              )}
              {updating ? "Update" : "Create"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
