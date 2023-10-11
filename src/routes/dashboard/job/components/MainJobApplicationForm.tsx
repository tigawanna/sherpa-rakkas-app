import { FormHeader } from '@/components/form/inputs/FormHeader';
import { TheTextAreaInput } from '@/components/form/inputs/TheTextArea';
import { TheTextInput } from '@/components/form/inputs/TheTextInput';
import { useFormHook } from '@/components/form/useForm';
import { TJobApplicationInputType, jobApplicationApi } from '@/routes/api/helpers/prisma/job-application';
import { useMultiStepForm } from '@/utils/hooks/useMultiStepForm';
import { useQueryClient, useSSM } from 'rakkasjs';



import { JobBasicInfoForm } from './JobBasicInfoForm';
import { handleJobApplicationSubmit } from './helpers/submit';
import { ResumeMultiStepForm } from './resume/steps/ResumeMutiStepForm';


interface MainJobApplicationFormProps {
    default_value?: TJobApplicationInputType;
    updating?: boolean;
    refetch?: () => void;
    editing?: boolean;
}

export function MainJobApplicationForm({
    default_value,
    refetch,
    editing = true,
    updating = false,
}: MainJobApplicationFormProps) {
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
                job_title: default_value?.job_title ?? '',
                description: default_value?.description ?? '',
                job_posting_url: default_value?.job_posting_url ?? '',

                cover_letter: default_value?.cover_letter ?? '',
                resume: default_value?.resume ?? '',
            },
        });

    function setResume(resume: string) {
        setInput((prev) => {
            return {
                ...prev,
                resume,
            };
        });
    }

      const {
          steps,
          currentStepIndex,
          step,
          isFirstStep,
          isLastStep,
          back,
          next,
          goTo,
      } = useMultiStepForm([
          {
              title: 'Job Basic Info',
              component: (
                  <JobBasicInfoForm
                      editing={editing}
                      input={input}
                      updating={updating}
                      isLoading={
                          create_mutation.isLoading || update_mutation.isLoading
                      }
                      setInput={setInput}
                      handleSubmit={(e) =>
                          handleJobApplicationSubmit({
                              create_mutation,
                              update_mutation,
                              editing,
                              input,
                              updating,
                          })
                      }
                      handleChange={handleChange}
                  />
              ),
          },
          {
              title: 'Resume',
              component: <ResumeMultiStepForm setResume={setResume} application_input={input}/>,
          },
      ]);



    return (
        <div className="w-full h-full flex items-center justify-center gap-3">

      <div className='card card-bordered w-full p-5  min-h-[70vh] flex flex-col gap-3 items-stretch justify-between '>
        {/* multistep tabs */}
        <div className="flex w-full flex-wrap items-center gap-3 ">
        {steps.map((item, index) => {
          const base_style = "btn btn-sm btn-outline";
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
          );
        })}
      </div>
            {/* multiste progress indicator */}
        <div className="absolute right-[4%] top-[4%]">
          {currentStepIndex + 1} / {steps.length}
        </div>
               {/* current multi step component */}
        <h2 className="text-xl font-bold">{step?.title}</h2>
        {step?.component}
        {/* multi step bottom next prev buttons  */}
        <div className="mt-4 flex justify-end gap-2 ">
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
      </div>
        </div>
    );
}
