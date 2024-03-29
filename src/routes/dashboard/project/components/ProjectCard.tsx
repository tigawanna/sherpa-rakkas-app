import { DeleteConfirm } from '@/components/modal/DeleteConfirm';
import { projectApi } from '@/routes/api/helpers/prisma/projects';
import { Project } from '@prisma/client';
import { Image } from '@unpic/react';
import { Link, usePageContext, useSSM } from 'rakkasjs';
import { toast } from 'react-toastify';

interface ProjectCardProps {
  item: Project;
}

export function ProjectCard({ item }: ProjectCardProps) {
  const page_ctx = usePageContext();
  const qc = page_ctx.queryClient;

  const user = qc.getQueryData('user') as LuciaUser;

  // const delete_mutation = api.project.removeOne.useMutation();
  const delete_mutation = useSSM<void, { id: string }>(async (ctx, vars) => {
    projectApi.removeOne({ item_id: vars.id, user_id: user.userId! });
  });

  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then(() => {
        toast('Project deleted successfully', { type: 'success' });
        qc.invalidateQueries('projects');
      })
      .catch((error) =>
        toast(error.message, { type: 'error', autoClose: false }),
      );
  }
  const modal_id = 'delete_project_modal';
  return (
    <div
      key={item.id}
      className="flex w-full flex-col justify-center gap-1 rounded-md border p-1 shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] relative"
    >

        <Link
          href={`/dashboard/project/${item.id}`}
          key={item.id}
          className="hover:bg-base-300 hover:text-accent w-full rounded-lg"
        >
          <h2 className="text-lg font-bold p-2">{item.name}</h2>
          <figure className="h-full w-full ">
            <Image
              src={item.image_url ?? 'https://picsum.photos/id/4/500/333'}
              alt={item.name}
              loading="lazy"
              layout="fullWidth"
              height={200}
              className="h-auto w-full"
            />
          </figure>
        </Link>
          <div className="flex w-full items-start justify-between gap-1">
            <p className="line-clamp-2 px-2 py-1 text-sm">{item.description}</p>
            <div className="w-fit">
            <DeleteConfirm
            is_loading={delete_mutation.isLoading}
            handleDelete={() => handleDelete(item.id)}
            modal_id={modal_id}
          />
          </div>
          </div>


    

    </div>
  );
}
