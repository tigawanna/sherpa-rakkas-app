import { useState } from "react";
import { Edit, Loader } from "lucide-react";
import { useFormHook } from "@/components/form/useForm";
import { TUserProfileInputType } from "@/routes/api/helpers/prisma/projects";
import { ThePicUrlInput } from "@/components/form/inputs/ThePicUrlInput";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";
import { TheCountryFields } from "@/components/form/TheCountryFields";
import { useSSM } from "rakkasjs";
import { prisma } from "@/lib/db/prisma";
import { toast } from "react-toastify";
import { TheStringListInput } from "@/components/form/inputs/StringListInput";
import { Button } from "@/components/shadcn/ui/button";
import { Prisma } from "@prisma/client";
import { generatePrismaErrorFields, mapPrismaIssueToField } from "@/utils/error-handling";
import { title } from "radash";

interface ProfileFormProps {
  user: Partial<TUserProfileInputType> & { avatar?: string; userId: string };
  updating?: boolean;
}

// function mapFieldsToError<T=Record<string,any>>(fields:T){
// if(fields){
// const fields_list = Object.keys(fields)
// fields_list.reduce((acc:any, field)=>{
//   acc[field] = mapPrismaIssueToField(fields[field], field)
//   return acc
// }, {})


// }
// }

export function ProfileForm({ user, updating }: ProfileFormProps) {

  const mutation = useSSM<any, TUserProfileInputType>(async (ctx, vars) => {
    try {
      await prisma.user.update({
        where: {
          id: user.userId,
        },
        data: {
          ...vars,
        },
      });
    } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log("PRISMA ERROR ==>", error);
            console.log("error fields  == ", generatePrismaErrorFields(vars, error));
            const custom_error  ={
                  fields: generatePrismaErrorFields(vars, error),
                  message: "Error updating profile"+error.message,
              }
        throw new CustomError(custom_error.message, custom_error.fields);
        }
      throw error;
    }
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TUserProfileInputType>({
      initialValues: {
        about_me: user.about_me ?? "",
        email: user.email ?? "",
        github_username: user.github_username ?? "",
        linkedin_username: user.linkedin_username ?? "",
        name: user.name ?? "",
        avatar: user?.avatar ?? "",
        country: user.country ?? "",
        city: user.city ?? "",
        phone: user.phone ?? "",
        skills: user.skills ?? "",
      },
    });

  const [editing, setEditing] = useState(!updating);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    mutation
      .mutateAsync(input)
      .then(() => toast("Profile created successfully", { type: "success" }))
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }

  const text_fields: Array<keyof TUserProfileInputType> = [
    "email",
    "name",
    "github_username",
    "linkedin_username",
  ];
  const text_area_fields: Array<keyof TUserProfileInputType> = ["about_me"];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-secondary/5">
      <h2 className="text-2xl font-bold p-1 sticky top-10">Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="m-1 flex h-full w-full flex-col items-center justify-center"
      >
        <div className="flex w-full justify-end px-5 sticky top-10 z-50 ">
          <Edit
            className={editing ? "h-6 w-6 text-accent" : "h-6 w-6"}
            onClick={() => setEditing(!editing)}
          />
        </div>
        <div
          className="flex  justify-start items-center md:items-start h-full w-full flex-col gap-10
       rounded-lg  p-2 md:flex-row"
        >
          {/* avatar */}
          <ThePicUrlInput
            container_classname="md:w-fit"
            img_url={input.avatar}
            editing={editing}
            setInputImage={(url) =>
              setInput((prev) => {
                return {
                  ...prev,
                  image_url: url ?? "",
                };
              })
            }
          />

          <div className="flex h-full w-full flex-col items-center gap-5">
            {/* text fields */}
            <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row">
              {text_fields.map((field) => {
                return (
                  <TheTextInput
                    key={field}
                    field_key={field}
                    value={input[field]}
                    // input={input}
                    field_name={title(field)}
                    className="input input-bordered input-sm w-full  "
                    label_classname="font-thin"
                    onChange={handleChange}
                    editing={editing}
                  />
                );
              })}
            </div>
            {/* text area fields */}
            <div className="flex w-full flex-col items-center justify-center gap-1 ">
              {text_area_fields.map((field) => {
                return (
                  <TheTextAreaInput
                    field_key={field}
                    key={field}
                    value={input[field]}
                    // input={input}
                    field_name={title(field)}
                    onChange={handleChange}
                    label_classname=""
                    editing={editing}
                  />
                );
              })}
            </div>

            <TheCountryFields
              editing={editing}
              country={{
                city: input.city,
                country: input.country,
                phone: input.phone,
              }}
              setInput={(value) =>
                setInput((prev) => {
                  return {
                    ...prev,
                    country: value.country,
                    phone: value.phone,
                    city: value.city,
                  };
                })
              }
            />

            <TheStringListInput
              editing={editing}
              field_name="Skills"
              field_key="skills"
              input={input}
              setInput={setInput}
            />

            {editing && (
              <div className="flex w-full items-center justify-center">
                <Button
                  type="submit"
                  className="btn btn-sm btn-outline min-w-[50%]"
                  variant={"ghost"}
                  size={"sm"}
                >
                  {mutation.isLoading ? (
                    <Loader className="h-6 w-6 animate-spin" />
                  ) : (
                    <div></div>
                  )}
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
