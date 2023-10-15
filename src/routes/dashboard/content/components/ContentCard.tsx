import { DeleteConfirm } from "@/components/modal/DeleteConfirm";
import {
  TContentInputType,
  contentApi,
} from "@/routes/api/helpers/prisma/content";
import { handleMutationResponse } from "@/utils/async";
import { Link, useQueryClient, useSSM } from "rakkasjs";
import { toast } from "react-toastify";

interface ContentCardProps {
  item: TContentInputType;
  refetch: () => void;
}

export function ContentCard({ item, refetch }: ContentCardProps) {
  const qc = useQueryClient();
  const user = qc.getQueryData("user");
  // const delete_mutation = api.hackathon.removeOne.useMutation();
  const delete_mutation = useSSM<
    Awaited<ReturnType<typeof contentApi.removeOne>>,
    { id: string }
  >((_, vars) => {
    return contentApi.removeOne({ item_id: vars.id, user_id: user.id });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then((res) => {
        handleMutationResponse({
          res,

          successMessage(res) {
            return "Content entry deleted successfully";
          },
        });
        refetch();
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }
  const modal_id = "delete_content_mmodal";
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border p-2 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] "
    >
      <div className="flex justify-between items-start">
        <Link
        href={`/dashboard/content/${item?.id}`}
        className="hover:text-accent w-full rounded-lg ">
        <h3 className="text-2xl font-bold">{item.title}</h3>
        <h3 className="border border-accent rounded-lg px-2 w-fit">{item.type}</h3>
      </Link>
          <DeleteConfirm
            is_loading={delete_mutation.isLoading}
            handleDelete={() => handleDelete(item?.id!)}
            modal_id={modal_id}
          />
        </div>



      <div className=" flex items-center justify-between text-sm border-t">
        <h3>{item?.createdAt?.toISOString().split("T")[0]}</h3>
      </div>
    </div>
  );
}
