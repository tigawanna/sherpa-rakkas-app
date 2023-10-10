import { useFormHook } from "@/components/form/useForm";
import { TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";
import {
  TResumeInputType,
  resumeApi,
} from "@/routes/api/helpers/prisma/resume";
import { handleMutationResponse } from "@/utils/async";
import { useQueryClient, useSSM } from "rakkasjs";
import { useState } from "react";
import { toast } from "react-toastify";

interface ResumeFormProps {
  job: TJobApplicationInputType;
  default_value?: TResumeInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function ResumeForm({
  default_value,
  job,
  updating,
  refetch,
}: ResumeFormProps) {
  const qc = useQueryClient();
  const { userId } = qc.getQueryData("user") as LuciaUser;

  const create_mutation = useSSM<
    Awaited<ReturnType<typeof resumeApi.addNew>>,
    TResumeInputType
  >((ctx, vars) => {
    return resumeApi.addNew({ input: vars });
  });

  const update_mutation = useSSM<
    Awaited<ReturnType<typeof resumeApi.updateOne>>,
    TResumeInputType
  >((ctx, vars) => {
    return resumeApi.updateOne({ input: vars, user_id: userId! });
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TResumeInputType>({
      initialValues: {
        id: default_value?.id,
        userId: default_value?.userId ?? userId!,
        body: default_value?.body ?? "",
        jobAplicationId: default_value?.id ?? (job.id as string),
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
                return "Resume entry updated successfully";
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
                return "Resume entry updated successfully";
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2"></div>
    </div>
  );
}
