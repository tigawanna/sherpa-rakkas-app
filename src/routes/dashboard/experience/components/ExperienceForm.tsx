import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import { TExperienceInputType, experienceApi } from "@/routes/api/helpers/prisma/experience";
import { navigate, useQueryClient, useSSM } from "rakkasjs";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useFormHook } from "@/components/form/useForm";
import { Experience } from "@prisma/client";
import { handleMutationResponse } from "@/utils/async";


interface ExperienceFormProps {
  default_value?: TExperienceInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function ExperienceForm({
  default_value,
  updating,
  refetch
}: ExperienceFormProps) {
  
  const qc = useQueryClient();
  const {userId} = qc.getQueryData("user") as LuciaUser;

  const create_mutation = useSSM<
    Awaited<ReturnType<typeof experienceApi.addNew>>,
    TExperienceInputType
  >((ctx, vars) => {
    return experienceApi.addNew({ input: vars });
  });

  const update_mutation = useSSM<
    Awaited<ReturnType<typeof experienceApi.updateOne>>,
    TExperienceInputType
  >((ctx, vars) => {
    return experienceApi.updateOne({ input: vars, user_id:userId! });
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TExperienceInputType>({
      initialValues: {
        id: default_value?.id,
        company: default_value?.company ?? "",
        description: default_value?.description ?? "",
        position: default_value?.position ?? "",
        from: default_value?.from ?? new Date(),
        userId: default_value?.userId ?? userId!,
        to: default_value?.to ?? new Date(),
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
                   return "Experience updated successfully";
                 },
               });
              refetch?.()
          })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
          );
      } else {
        create_mutation
          .mutateAsync(input)
          .then((res) => {
         handleMutationResponse({res,
          successMessage(res) {
             return "Experience added successfully";
           },
         });
         navigate("/dashboard/experience");
          
          })
          .catch((error) =>
            toast(error.message, { type: "error", autoClose: false })
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
      <div className="flex w-full justify-end px-5">
        <Edit
          className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center gap-2"
      >
        <TheTextInput<Experience>
          field_key={"company"}
          value={input["company"]}
          // input={input}
          field_name={"Company"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Experience>
          field_key={"position"}
          value={input["position"]}
          // input={input}
          field_name={"Job Position"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<Experience>
          field_key={"description"}
          value={input["description"]??""}
          // input={input}
          field_name={"Job Description"}
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />

        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<Experience>
            field_key={"from"}
            value={dateToString(input["from"])}
            type="date"
            // input={input}
            field_name={"From"}
            className="input input-bordered input-sm w-full  "
            label_classname="text-base capitalize"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInput((prev) => {
                return { ...prev, from: new Date(e.target.value) };
              });
            }}
            editing={editing}
          />
          <TheTextInput<Experience>
            field_key={"to"}
            value={dateToString(input["to"])}
            type="date"
            // input={input}
            field_name={"To"}
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
              {updating ? "Update" : "Create"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
