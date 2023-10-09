import { useState } from "react";
import { toast } from "react-toastify";
import { JobBasicInfoForm } from "./JobBasicInfoForm";
import {
  jobApplicationApi,
  TJobApplicationInputType,
} from "@/routes/api/helpers/prisma/job-application";
import { useFormHook } from "@/components/form/useForm";

import { useQueryClient, useSSM } from "rakkasjs";
import { handleMutationResponse } from "@/utils/async";

interface JobApplicationFormProps {
  default_value?: TJobApplicationInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function JobApplicationForm({
  default_value,
  updating = false,
  refetch,
}: JobApplicationFormProps) {
  const qc = useQueryClient();
  const { userId } = qc.getQueryData("user") as LuciaUser;

  // const create_mutation = api.experience.addNew.useMutation();
  // const update_mutation = api.experience.updateOne.useMutation();

  const create_mutation = useSSM<
    Awaited<ReturnType<typeof jobApplicationApi.addNew>>,
    TJobApplicationInputType
  >((ctx, vars) => {
    return jobApplicationApi.addNew({ input: vars });
  });

  const update_mutation = useSSM<
    Awaited<ReturnType<typeof jobApplicationApi.updateOne>>,
    TJobApplicationInputType
  >((ctx, vars) => {
    return jobApplicationApi.updateOne({ input: vars, user_id: userId! });
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TJobApplicationInputType>({
      initialValues: {
        id: default_value?.id,
        userId: default_value?.userId ?? userId!,
        resumeId: default_value?.resumeId ?? null,
        job_title: default_value?.job_title ?? "",
        description: default_value?.description ?? "",
        job_posting_url: default_value?.job_posting_url ?? "",
        cover_letter: default_value?.cover_letter ?? "",
        resume: default_value?.resume ?? "",
        projects: default_value?.projects ?? [],
      },
    });

  const [editing, setEditing] = useState(!updating);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (editing) {
      if (updating) {
        update_mutation
          .mutateAsync(input)
          .then((res) => {
            handleMutationResponse({
              res,
              successMessage(res) {
                return "Application updated successfully";
              },
            });
            refetch?.();
          })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      } else {
        create_mutation
          .mutateAsync(input)
          .then((res) => {
            handleMutationResponse({
              res,
              successMessage(res) {
                return "Application updated successfully";
              },
            });
          })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="h-full w-full  flex-col items-center justify-center p-5 md:w-[60%]">
        <JobBasicInfoForm
          editing={editing}
          input={input}
          updating={updating}
          isLoading={create_mutation.isLoading || update_mutation.isLoading}
          setInput={setInput}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
      <div className="h-full w-full  flex-col items-center justify-center p-5 ">
        <ResumeMultiStepForm />
      </div>
    </div>
  );
}
