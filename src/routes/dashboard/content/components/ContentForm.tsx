
import { useState } from "react";
import { toast } from "react-toastify";
import { Edit, Loader } from "lucide-react";
import { TContentInputType, contentApi } from "@/routes/api/helpers/prisma/content";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { useFormHook } from "@/components/form/useForm";
import { Content } from "@prisma/client";
import { navigate, useQueryClient, useSSM } from "rakkasjs";
import { handleMutationResponse } from "@/utils/async";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcn/ui/select";
import { Label } from "@radix-ui/react-label";



interface ContentFormProps {
  default_value?: TContentInputType;
  updating?: boolean;
  refetch?: () => void;
}

export function ContentForm({
  default_value,
  updating,
  refetch
}: ContentFormProps) {

    const qc = useQueryClient();
    const { userId } = qc.getQueryData("user") as LuciaUser;

    const create_mutation = useSSM<
      Awaited<ReturnType<typeof contentApi.addNew>>,
      TContentInputType
    >((ctx, vars) => {
      return contentApi.addNew({ input: vars });
    });

    const update_mutation = useSSM<
      Awaited<ReturnType<typeof contentApi.updateOne>>,
      TContentInputType
    >((ctx, vars) => {
      return contentApi.updateOne({ input: vars, user_id: userId! });
    });

  const { handleChange, input,setInput } =
    useFormHook<TContentInputType>({
      initialValues: {
        id: default_value?.id,
        userId: default_value?.userId ?? userId!,
        content_url: default_value?.content_url ?? "",
        title: default_value?.title ?? "",
        type: default_value?.type ?? "Blog",
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
                     return "Content entry updated successfully";
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
                     return "Content entry updated successfully";
                   },
                 });
              navigate("/dashboard/content");
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
        <TheTextInput<Content>
          field_key={"title"}
          value={input["title"]}
          // input={input}
          field_name={"Title"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        <TheTextInput<Content>
          field_key={"content_url"}
          value={input["content_url"]}
          // input={input}
          type="url"
          field_name={"Content Url"}
          className="input input-bordered input-sm w-full  "
          label_classname="text-base capitalize"
          onChange={handleChange}
          editing={editing}
        />
        {/* "Video" | "Blog" | "Gist" | "Podcast" */}
        <div className="w-full flex flex-col gap-1">
          <Label className="text  font-serif font-bold">Content Type</Label>
          <Select
            defaultValue={input["type"]}
            // className="select select-accent select-sm w-full max-w-xs"
            onValueChange={(e) => {
              setInput((prev) => {
                return {
                  ...prev,
                  qualification: e as Content["type"],
                };
              });
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"Video"}>Video</SelectItem>
                <SelectItem value={"Blog"}>Blog</SelectItem>
                <SelectItem value={"Gist"}>Gist</SelectItem>
                <SelectItem value={"Podcast"}>Podcast</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
