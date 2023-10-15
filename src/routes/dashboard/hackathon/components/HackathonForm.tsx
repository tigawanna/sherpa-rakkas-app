import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import {
  THackathonInputType,
  hackathonApi,
} from "@/routes/api/helpers/prisma/hackathon";
import { useFormHook } from "@/components/form/useForm";
import { navigate, useQueryClient, useSSM } from "rakkasjs";
import { handleMutationResponse } from "@/utils/async";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheListInput } from "@/components/form/inputs/ListInput";
import { FormHeader } from "@/components/form/inputs/FormHeader";

interface HackathonFormProps {
  default_value?: THackathonInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function HackathonForm({
  default_value,
  updating,
  refetch,
}: HackathonFormProps) {
  const qc = useQueryClient();
  const user = qc.getQueryData("user") as LuciaUser;

  const create_mutation = useSSM<
    Awaited<ReturnType<typeof hackathonApi.addNew>>,
    THackathonInputType
  >((ctx, vars) => {
    return hackathonApi.addNew({ input: vars });
  });

  const update_mutation = useSSM<
    Awaited<ReturnType<typeof hackathonApi.updateOne>>,
    THackathonInputType&{id:string}
  >((ctx, vars) => {
    return hackathonApi.updateOne({ input: vars, user_id: user.userId! });
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<THackathonInputType>({
      initialValues: {
        id: default_value?.id,
        name: default_value?.name ?? "",
        description: default_value?.description ?? "",
        link: default_value?.link ?? "",
        technologies: default_value?.technologies ?? [],
        from: default_value?.from ?? new Date(),
        to: default_value?.to ?? new Date(),
        userId: default_value?.userId ?? (user.userId as string),
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
                return "Hackathon updated successfully";
              },
            });
            refetch && refetch();
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
                return "Hackathon created successfully";
              },
            });
            navigate("/dashboard/hackathon");
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 border p-2 shadow shadow-accent">
      <div className="flex w-full justify-end px-5">
        <Edit
          className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
          onClick={() => setEditing(!editing)}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex h-full w-full flex-col items-center justify-center gap-4"
      >
        <FormHeader editing={editing} updating={updating} name="Hackathon" />
        <TheTextInput<THackathonInputType>
          field_key={"name"}
          value={input["name"]}
          // input={input}
          field_name={"Hackathon name"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<THackathonInputType>
          field_key={"description"}
          value={input["description"]}
          // input={input}
          field_name={"Brief description"}
          className="min-h-[200px]"
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<THackathonInputType>
          field_key={"link"}
          value={input["link"]}
          // input={input}
          field_name={"Link to Project"}
          type="url"
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />

        <TheListInput
          editing={editing}
          field_name="Technologies"
          field_key="technologies"
          input={input}
          setInput={setInput}
        />

        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<THackathonInputType>
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
          <TheTextInput<THackathonInputType>
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
            <button className="btn btn-sm btn-outline  mt-2 w-[80%] sm:w-[70%] md:w-[40%] ">
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
