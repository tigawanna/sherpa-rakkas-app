import { FormHeader } from '@/components/form/inputs/FormHeader';
import { TheTextInput } from '@/components/form/inputs/TheTextInput';
import { useFormHook } from '@/components/form/useForm';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/ui/select';
import {
  TEducationInputType,
  educationApi,
} from '@/routes/api/helpers/prisma/education';
import { handleMutationResponse } from '@/utils/async';
import { Edit, Loader } from 'lucide-react';
import { navigate, useQueryClient, useSSM } from 'rakkasjs';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface EducationFormProps {
  default_value?: TEducationInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function EducationForm({
  default_value,
  updating,
  refetch,
}: EducationFormProps) {
  const qc = useQueryClient();
  const { userId } = qc.getQueryData('user') as LuciaUser;

  const create_mutation = useSSM<
    Awaited<ReturnType<typeof educationApi.addNew>>,
    TEducationInputType
  >((ctx, vars) => {
    return educationApi.addNew({ input: vars });
  });

  const update_mutation = useSSM<
    Awaited<ReturnType<typeof educationApi.updateOne>>,
    TEducationInputType & { id: string }
  >((ctx, vars) => {
    return educationApi.updateOne({ input: vars, user_id: userId! });
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TEducationInputType>({
      initialValues: {
        id: default_value?.id,
        school: default_value?.school ?? '',
        field: default_value?.field ?? '',
        from: default_value?.from ?? new Date(),
        userId: default_value?.userId ?? userId!,
        to: default_value?.to ?? new Date(),
        qualification: default_value?.qualification ?? 'Certificate',
      },
    });

  const [editing, setEditing] = useState(!updating);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (editing) {
      if (updating) {
        update_mutation
          .mutateAsync({ ...input, id: input.id! })
          .then((res) => {
            handleMutationResponse({
              res,
              successMessage(res) {
                return 'Education entry updated successfully';
              },
            });
            refetch?.();
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
                return 'Education entry updated successfully';
              },
            });
            navigate('/dashboard/education');
          })
          .catch((error) =>
            toast(error.message, { type: 'error', autoClose: false }),
          );
      }
    }
  }
  const dateToString = (date: Date | string) => {
    if (date instanceof Date) {
      return date.toISOString().slice(0, 10);
    }
    return date;
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border p-2 shadow shadow-accent">
      <div className="flex w-full justify-end px-5">
        <Edit
          className={editing ? 'h-6 w-6 text-accent' : 'h-6 w-6'}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center gap-2"
      >
        <FormHeader editing={editing} updating={updating} name="Education" />
        <TheTextInput<TEducationInputType>
          field_key={'school'}
          value={input['school']}
          // input={input}
          field_name={'institution'}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<TEducationInputType>
          field_key={'field'}
          value={input['field']}
          // input={input}
          field_name={'Field of study'}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        {/* "Certificate" | "Bachelors" | "Masters" | "PhD" | */}
        <div className="w-full">
          <Select
            defaultValue={input['qualification']}
            onValueChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  qualification: e as TEducationInputType['qualification'],
                };
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Education Qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={'Certificate'}>Certificate</SelectItem>
                <SelectItem value={'Diploma'}>Diploma</SelectItem>
                <SelectItem value={'Masters'}>Masters</SelectItem>
                <SelectItem value={'PhD'}>PhD</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<TEducationInputType>
            field_key={'from'}
            value={dateToString(input['from'])}
            type="date"
            // input={input}
            field_name={'From'}
            className="input input-bordered input-sm w-full  "
            label_classname="text-base capitalize"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput((prev) => {
                return { ...prev, from: new Date(e.target.value) };
              });
            }}
            editing={editing}
          />
          <TheTextInput<TEducationInputType>
            field_key={'to'}
            value={dateToString(input['to'])}
            type="date"
            // input={input}
            field_name={'To'}
            className="input input-bordered input-sm w-full  "
            label_classname="text-base capitalize"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput((prev) => {
                return { ...prev, to: new Date(e.target.value) };
              });
            }}
            editing={editing}
          />
        </div>
        {editing && (
          <div className="flex w-full items-center justify-center">
            <button className="btn btn-sm  mt-2 w-[80%] sm:w-[70%] md:w-[40%] ">
              {create_mutation.isLoading || update_mutation.isLoading ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                <div></div>
              )}
              {updating ? 'Update' : 'Create'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
