import { DeleteConfirm } from "@/components/modal/DeleteConfirm";
import { THackathonInputType, hackathonApi } from "@/routes/api/helpers/prisma/hackathon";
import { handleMutationResponse } from "@/utils/async";
import { Link, useQueryClient, useSSM } from "rakkasjs";
import { toast } from "react-toastify";

interface HackathonCardProps {
  item: THackathonInputType;
  refetch: () => void;
}

export function HackathonCard({ item,refetch }: HackathonCardProps) {

  const qc = useQueryClient();
  const user = qc.getQueryData("user");
  // const delete_mutation = api.hackathon.removeOne.useMutation();
  const delete_mutation = useSSM<Awaited<ReturnType<typeof hackathonApi.removeOne>>, { id: string }>((_,vars) => {
    return hackathonApi.removeOne({ item_id: vars.id, user_id: user.id });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then((res) => {
        handleMutationResponse({
      
          res,
      
          successMessage(res) {
            return "Hacakthon entry deleted successfully";
          },
        });
        refetch();
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }

  const modal_id = "delete_hackathon_modal";
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border shadow-sm shadow-accent
      p-2 hover:border-accent sm:w-[45%] lg:w-[30%] "
      >
      <div className="flex justify-between items-center">
      <h3 className="text-2xl font-bold w-full">{item?.name}</h3>
      <DeleteConfirm
        is_loading={delete_mutation.isLoading}
        handleDelete={() => handleDelete(item?.id!)}
        modal_id={modal_id}
      />
      </div>
      <Link
        href={`/dashboard/hackathon/${item?.id}`}
        className="hover:bg-base-300 hover:text-accent"
      >
        <h3 className="">{item?.description}</h3>
      </Link>

      <div className="flex w-full flex-wrap gap-2 p-1">
        {item?.technologies &&
          item?.technologies?.map((tech) => (
            <h2 key={tech} className="rounded-xl border border-accent px-2">
              {tech}
            </h2>
          ))}
      </div>

      <div className=" flex w-[90%] items-center justify-between border-t border-t-accent text-sm">
        <h3>From : {item?.from?.toISOString().split("T")[0]}</h3>
        <h3>To : {item?.to?.toISOString().split("T")[0]}</h3>
      </div>
    </div>
  );
}
