import { DeleteConfirm } from '@/components/modal/DeleteConfirm';
import {
  TJobApplicationInputType,
  jobApplicationApi,
} from '@/routes/api/helpers/prisma/job-application';
import { handleMutationResponse } from '@/utils/async';
import { ExternalLink } from 'lucide-react';
import { Link, useQueryClient, useSSM } from 'rakkasjs';
import { toast } from 'react-toastify';

interface JobApplicationCardProps {
  item: TJobApplicationInputType & { id: string };
  refetch: () => void;
}

export function JobApplicationCard({ item, refetch }: JobApplicationCardProps) {
  const qc = useQueryClient();
  const user = qc.getQueryData('user');
  // const delete_mutation = api.hackathon.removeOne.useMutation();
  const delete_mutation = useSSM<
    Awaited<ReturnType<typeof jobApplicationApi.removeOne>>,
    { id: string }
  >((_, vars) => {
    return jobApplicationApi.removeOne({ item_id: vars.id, user_id: user.id });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then((res) => {
        handleMutationResponse({
          res,
          successMessage(res) {
            return 'Education entry deleted successfully';
          },
        });
        refetch();
      })
      .catch((error) =>
        toast(error.message, { type: 'error', autoClose: false }),
      );
  }
  const modal_id = 'delete_education_modal';
  return (
    <div
      key={item.id}
      className="flex w-[95%] flex-col justify-center gap-1 rounded-md border p-2 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%]"
    >
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/job/${item.id}`}
          key={item.id}
          about="view job application"
          className="flex w-full flex-col justify-center gap-1 rounded-md hover:brightness-75
            p-2  "
        >
          <h3 className="text-2xl font-bold">{item.job_title}</h3>
          <p className="line-clamp-2">{item.description}</p>
        </Link>
        <div className="flex items-start h-full">
          <DeleteConfirm
            is_loading={delete_mutation.isLoading}
            handleDelete={() => handleDelete(item.id)}
            modal_id={modal_id}
          />
        </div>
      </div>

      <Link
        href={item.job_posting_url ?? ''}
        target="_blank"
        prefetch={'never'}
        className="hover:brightness-75 hover:text-blue-600 flex gap-2 items-center w-full overflow-clip hover:overflow-visible"
      >
        {item.job_posting_url}
        <ExternalLink className="w-4 h-4" />
      </Link>
      <div className=" flex items-center justify-between text-sm border-t">
        <h3>On : {item.createdAt?.toISOString().split('T')[0]}</h3>
      </div>
    </div>
  );
}
