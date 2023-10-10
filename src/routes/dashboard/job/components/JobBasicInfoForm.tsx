import { FormHeader } from "@/components/form/inputs/FormHeader";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";
import { Loader } from "lucide-react";


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

export function JobBasicInfoForm({input,setInput,handleSubmit,handleChange,editing,isLoading,updating}:JobBasicInfoFormProps){
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
        className="min-h-[10px]"
        description="copy-paste in your job description"
        label_classname="text-base capitalize"
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
