import { DeleteConfirm } from "@/components/modal/DeleteConfirm";
import { TEducationInputType, educationApi } from "@/routes/api/helpers/prisma/education";
import { handleMutationResponse } from "@/utils/async";
import { Link, useQueryClient, useSSM } from "rakkasjs";
import { toast } from "react-toastify";

interface EducationCardProps {
  item: TEducationInputType;
  refetch: () => void;
}

export function EducationCard({ item, refetch }: EducationCardProps) {
  
  const qc = useQueryClient();
  const user = qc.getQueryData("user");
  // const delete_mutation = api.hackathon.removeOne.useMutation();
  const delete_mutation = useSSM<
    Awaited<ReturnType<typeof educationApi.removeOne>>,
    { id: string }
  >((_, vars) => {
    return educationApi.removeOne({ item_id: vars.id, user_id: user.id });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then((res) => {
        handleMutationResponse({
          res,

          successMessage(res) {
            return "Education entry deleted successfully";
          },
        });
        refetch();
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }
  const modal_id = "delete_education_modal";
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border p-2 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] "
    >
      <div className="flex gap-2 items-start justify-between">
      <Link
        href={`/dashboard/content/${item?.id}`}
   className="hover:bg-base-300 hover:text-accent w-full rounded-lg"
      >
        <h3 className="text-2xl font-bold">{item.school}</h3>
        <h3 className="text-lg">{item.field}</h3>
        <h3 className="">{item.qualification}</h3>
      </Link>
        <DeleteConfirm
          is_loading={delete_mutation.isLoading}
          handleDelete={() => handleDelete(item?.id!)}
          modal_id={modal_id}
        />
      </div>

      <div className=" flex w-[90%] items-center justify-between border-t border-t-accent text-sm">
        <h3>From : {new Date(item?.from)?.toISOString().split("T")[0]}</h3>
        <h3>To : {new Date(item?.to)?.toISOString().split("T")[0]}</h3>
      </div>


    </div>
  );
}
