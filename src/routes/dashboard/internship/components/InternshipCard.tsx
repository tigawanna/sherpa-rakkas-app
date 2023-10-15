import { DeleteConfirm } from '@/components/modal/DeleteConfirm';
import {
  TInternshipInputType,
  internshipApi,
} from '@/routes/api/helpers/prisma/internship';
import { handleMutationResponse } from '@/utils/async';
import { Link, useQueryClient, useSSM } from 'rakkasjs';
import { toast } from 'react-toastify';

interface InternshipCardProps {
  item: TInternshipInputType;
  refetch: () => void;
}

export function InternshipCard({ item, refetch }: InternshipCardProps) {
  const qc = useQueryClient();
  const user = qc.getQueryData('user');
  // const delete_mutation = api.hackathon.removeOne.useMutation();
  const delete_mutation = useSSM<
    Awaited<ReturnType<typeof internshipApi.removeOne>>,
    { id: string }
  >((_, vars) => {
    return internshipApi.removeOne({ item_id: vars.id, user_id: user.id });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then((res) => {
        handleMutationResponse({
          res,

          successMessage(res) {
            return 'Internship entry deleted successfully';
          },
        });
        refetch();
      })
      .catch((error) =>
        toast(error.message, { type: 'error', autoClose: false }),
      );
  }

  const modal_id = 'delete_internship_modal';
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border p-2 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] "
    >
      <div className="flex gap-2 items-start justify-between">
        <Link
          href={`/dashboard/internship/${item?.id}`}
          className=" hover:text-accent w-full rounded-lg"
        >
          <h3 className="text-2xl font-bold">{item.company}</h3>
          <h3 className="">{item.role}</h3>

          <p className="line-clamp-1">{item.description}</p>
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
