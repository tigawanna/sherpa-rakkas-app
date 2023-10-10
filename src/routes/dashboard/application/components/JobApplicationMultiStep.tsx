import { useState } from "react";
import { JobApplicationProjects } from "./JobApplicationProjects";
import { useFormHook } from "@/components/form/useForm";
import { useMultiStepForm } from "@/utils/hooks/useMultiStepForm";
import { JobApplication } from "@prisma/client";
import { useQueryClient } from "rakkasjs";
import { TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";

interface JobApplicationMultiStepProps {
  default_value?: JobApplication;
  updating?: boolean;
}

export function JobApplicationMultiStep({
  default_value,
  updating,
}: JobApplicationMultiStepProps) {
  const qc = useQueryClient();
const {userId} = qc.getQueryData("user") as LuciaUser;

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TJobApplicationInputType>({
      initialValues: {
        id: default_value?.id,
        userId: default_value?.userId ?? userId!,
        job_title: default_value?.job_title ?? "",
        description: default_value?.description ?? "",
        job_posting_url: default_value?.job_posting_url ?? "",
        projects: default_value?.projects ?? [],
        cover_letter: default_value?.cover_letter ?? "",
        resume: default_value?.resume ?? "",
        resumeId: default_value?.resumeId??null,
      },
    });

  const [editing, setEditing] = useState(!updating);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next,goTo } =
    useMultiStepForm([
      {
        title: "Job Description",
        component: (
          <div>JOB DESCRIPTION</div>
        ),
      },

      {
        title: "Resume Projects",
        component: (
          <JobApplicationProjects
            input={input}
            setInput={setInput}
            editing={editing}
            handleChange={handleChange}
            user_profile={userId!}
          />
        ),
      },
      {
        title: "Resume Hackathons",
        component: (
          <JobApplicationProjects
            input={input}
            setInput={setInput}
            editing={editing}
            handleChange={handleChange}
            user_profile={userId!}
          />
        ),
      },
      // <StepTwo<typeof input> input={input} setInput={setInput} />,
    ]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
  }

  if (!userId) {
    return (
      <div className="flex h-full min-h-screen w-full items-center justify-center">
        <div className="rounded-lg border text-error">No matches found</div>
      </div>
    );
  }


  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
      <div className="flex flex-wrap w-[90%] items-center lg:w-[70%] gap-3">
        {steps.map((item, index) => {
          const base_style="btn btn-sm btn-outline";
          return (
            <button
            key={index}
              className={
                index === currentStepIndex
                  ? base_style + "border-accent text-accent"
                  : base_style
              }
              onClick={() => goTo(index)}
            >
              {item?.title}
            </button>
          );})}
      </div>

      <form
        onSubmit={onSubmit}
        className="card card-bordered w-[90%] p-5 lg:w-[70%]"
      >
        <div className="absolute right-[4%] top-[4%]">
          {currentStepIndex + 1} / {steps.length}
        </div>
        <h2 className="text-xl font-bold">{step?.title}</h2>
        {step?.component}
        <div className="mt-4 flex justify-end gap-2">
          {!isFirstStep && (
            <button
              type="button"
              onClick={back}
              className="btn btn-outline btn-sm text-sm"
            >
              Back
            </button>
          )}
          <button type="submit" className="btn btn-outline btn-sm text-sm">
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
