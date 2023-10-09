import { DeleteConfirm } from "@/components/modal/DeleteConfirm";
import { TExperienceInputType, experienceApi } from "@/routes/api/helpers/prisma/experience";
import { handleMutationResponse } from "@/utils/async";
import { useQueryClient, useSSM, Link } from "rakkasjs";
import { toast } from "react-toastify";

interface ExperienceCardProps {
  item: TExperienceInputType;
  refetch: () => void;
}

export function ExperienceCard({item,refetch}:ExperienceCardProps){
  const qc = useQueryClient();
  const user = qc.getQueryData("user");
  // const delete_mutation = api.hackathon.removeOne.useMutation();
  const delete_mutation = useSSM<
    Awaited<ReturnType<typeof experienceApi.removeOne>>,
    { id: string }
  >((_, vars) => {
    return experienceApi.removeOne({ item_id: vars.id, user_id: user.id });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then((res) => {
        handleMutationResponse({
          res,

          successMessage(res) {
            return "Experiance entry deleted successfully";
          },
        });
        refetch();
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }

  const modal_id = "delete_experience_modal";
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border p-2 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] "
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{item?.company}</h3>
        <DeleteConfirm
          is_loading={delete_mutation.isLoading}
          handleDelete={() => handleDelete(item?.id!)}
          modal_id={modal_id}
        />
      </div>

      <Link
        href={`/dashboard/experience/${item?.id}`}
        className="hover:bg-base-300 hover:text-accent"
      >
        <h3 className="text-2xl font-bold">{item?.company}</h3>
        <h3 className="text-lg">{item?.position}</h3>
        <p className="line-clamp-3">{item?.description}</p>
      </Link>

      <div className=" flex items-center justify-between text-sm">
        <h3>From : {item.from.toISOString().split("T")[0]}</h3>
        <h3>To : {item.to.toISOString().split("T")[0]}</h3>
      </div>

      <div className=" flex w-[90%] items-center justify-between border-t border-t-accent text-sm">
        <h3>From : {item?.from?.toISOString().split("T")[0]}</h3>
        <h3>To : {item?.to?.toISOString().split("T")[0]}</h3>
      </div>
    </div>
  );
}
