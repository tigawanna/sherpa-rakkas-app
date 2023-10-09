import { useState } from "react";
import { toast } from "react-toastify";
import {  Edit, Loader  } from "lucide-react";
import { TInternshipInputType, internshipApi } from "@/routes/api/helpers/prisma/internship";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useFormHook } from "@/components/form/useForm";
import { Internship } from "@prisma/client";
import { navigate, useQueryClient, useSSM } from "rakkasjs";
import { handleMutationResponse } from "@/utils/async";
import { FormHeader } from "@/components/form/inputs/FormHeader";



interface InternshipFormProps {
  default_value?: TInternshipInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function InternshipForm({ default_value, updating,refetch }: InternshipFormProps) {

    const qc = useQueryClient();
    const {userId} = qc.getQueryData("user") as LuciaUser;

    const create_mutation = useSSM<
      Awaited<ReturnType<typeof internshipApi.addNew>>,
      TInternshipInputType
    >((ctx, vars) => {
      return internshipApi.addNew({ input: vars });
    });

    const update_mutation = useSSM<
      Awaited<ReturnType<typeof internshipApi.updateOne>>,
      TInternshipInputType
    >((ctx, vars) => {
      return internshipApi.updateOne({ input: vars, user_id: userId! });
    });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TInternshipInputType>({
      initialValues: {
        id: default_value?.id,
        company: default_value?.company??"",
        role: default_value?.role??"",
        description: default_value?.description??"",
        from: default_value?.from??new Date(),
        userId:default_value?.userId ?? userId!,
        to: default_value?.to??new Date(),
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
                       return "Internship updated successfully";
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
          .then((res) =>{
            handleMutationResponse({
              res,
              successMessage(res) {
                return "Internship updated successfully";
              },
            });
             navigate("/dashboard/internship");
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
        className="flex h-full w-full flex-col items-center justify-center gap-2"
      >
        <h1 className="text-2xl font-bold">
          <FormHeader editing={editing} updating={updating} name="Internship"/>
        </h1>
        <TheTextInput<Internship>
          field_key={"company"}
          value={input["company"]}
          // input={input}
          field_name={"Company"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Internship>
          field_key={"role"}
          value={input["role"]}
          // input={input}
          field_name={"Role"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextAreaInput<Internship>
          field_key={"description"}
          value={input["description"]}
          // input={input}
          field_name={"Description"}
          className="min-h-[150px]"
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <div className="flex  w-full flex-col  items-center justify-evenly gap-2 sm:flex-row">
          <TheTextInput<Internship>
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
          <TheTextInput<Internship>
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
