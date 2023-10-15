import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { TJobApplicationInputType, jobApplicationApi } from "@/routes/api/helpers/prisma/job-application";
import { handleMutationResponse } from "@/utils/async";
import { Loader } from "lucide-react";
import { useQueryClient, useSSM } from "rakkasjs";
import { toast } from "react-toastify";


interface JobBasicInfoFormProps {
    input: TJobApplicationInputType;
    updating: boolean;
    editing: boolean;
    isLoading: boolean;
    setInput: React.Dispatch<React.SetStateAction<TJobApplicationInputType>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
}

export function JobBasicInfoForm({input,setInput,handleChange,editing,updating}:JobBasicInfoFormProps){
    const qc = useQueryClient();
    const { userId } = qc.getQueryData('user') as LuciaUser;

    const create_mutation = useSSM<
      Awaited<ReturnType<typeof jobApplicationApi.addNew>>,
      TJobApplicationInputType
    >((ctx, vars) => {
      return jobApplicationApi.addNew({ input: vars });
    });

    const update_mutation = useSSM<
      Awaited<ReturnType<typeof jobApplicationApi.updateOne>>,
      TJobApplicationInputType & { id: string }
    >((ctx, vars) => {
      return jobApplicationApi.updateOne({ input: vars, user_id: userId! });
    });
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  e.stopPropagation();

  if (editing) {
    if (updating && input?.id) {
      update_mutation
        .mutateAsync({...input,id:input.id})
        .then((res) => {
          handleMutationResponse({
            res,
            successMessage(res) {
              return 'Application updated successfully';
            },
          });
        })
        .catch((error) =>
          toast(error.message, { type: 'error', autoClose: false }),
        );
    } else {
      create_mutation
        .mutateAsync(input)
        .then((res) => {
          handleMutationResponse({
            res,
            successMessage(res) {
              return 'Application updated successfully';
            },
          });
        })
        .catch((error) =>
          toast(error.message, { type: 'error', autoClose: false }),
        );
    }
  }
}


const isLoading = create_mutation.isLoading || update_mutation.isLoading;
  return (
  <form
    onSubmit={handleSubmit}
    className="flex h-full w-full flex-col items-center justify-center gap-3 "
  >
    {/* <FormHeader editing={editing} updating={updating} name="Job Application" /> */}
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <TheTextInput<TJobApplicationInputType>
        field_key={"job_title"}
        value={input["job_title"]}
        // input={input}
        field_name={"Job Title"}
        className="input input-bordered input-sm w-full  "
        label_classname="text-base capitalize"
        onChange={handleChange}
        editing={editing}
      />
      <TheTextInput<TJobApplicationInputType>
        field_key={"job_posting_url"}
        value={input["job_posting_url"] ?? ""}
        // input={input}
        field_name={"Job posting Url"}
        type="url"
        className="input input-bordered input-sm w-full  "
        label_classname="text-base capitalize"
        onChange={handleChange}
        editing={editing}
      />
      <TheTextAreaInput<TJobApplicationInputType>
        field_key={"description"}
        value={input["description"] ?? ""}
        // input={input}
        field_name={"Job Description"}
        className="min-h-[200px]"
        description="copy-paste in your job description"
        label_classname="text-base capitalize gap-2"
        onChange={handleChange}
        editing={editing}
      />
    </div>
    {editing && (
      <div className="flex w-full items-center justify-center">
        <button className="btn btn-sm  mt-2 w-[80%] text-accent sm:w-[70%] md:w-[40%]">
          {isLoading ? (
            <Loader className="h-6 w-6 animate-spin" />
          ) : (
            <div></div>
          )}
          {updating ? "Update" : "Create"}
        </button>
      </div>
    )}
  </form>
);
}
