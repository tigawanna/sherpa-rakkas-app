import { Project } from "@prisma/client";
import { Image } from "@unpic/react";
import { Link, usePageContext, useSSM } from "rakkasjs";
import { toast } from "react-toastify";
import { projectApi } from "@/routes/api/helpers/prisma/projects";
import { DeleteConfirm } from "@/components/modal/DeleteConfirm";


interface ProjectCardProps {

  item: Project;
}

export function ProjectCard({ item }: ProjectCardProps) {
const page_ctx= usePageContext();
const qc=page_ctx.queryClient;

const user_id = qc.getQueryData("user").id;

// const delete_mutation = api.project.removeOne.useMutation();
const delete_mutation = useSSM<void,{id:string}>(async(ctx,vars)=>{
  projectApi.removeProject({id:vars.id,userId:user_id});

})



  function handleDelete(id: string) {
    delete_mutation
      .mutateAsync({ id })
      .then(() => {
        toast("Project deleted successfully", { type: "success" });
      qc.invalidateQueries("projects");
      })
      .catch((error) =>
        toast(error.message, { type: "error", autoClose: false })
      );
  }
  const modal_id="delete_project_modal";
  return (
    <div
      key={item.id}
      className="sm:2-[45%] card  max-h-[400px] min-h-[200px] 
             w-[95%] border  bg-base-100 shadow-xl hover:border-accent md:w-[30%]"
    >
      <DeleteConfirm
        is_loading={delete_mutation.isLoading}
        handleDelete={() => handleDelete(item.id)}
        modal_id={modal_id}
      />
      <Link
        href={`/dashboard/project/${item.id}`}
        key={item.id}
        className="flex h-full w-full flex-col"
      >
        <figure className="h-full w-full ">
          <Image
            src={item.image_url ?? "https://picsum.photos/id/4/500/333"}
            alt={item.name}
            loading="lazy"
            layout="fullWidth"
            height={200}
            className="h-auto w-full"
          />
        </figure>
        <div className="flex w-full flex-col gap-1 p-3">
          <h2 className="card-title">{item.name}</h2>
          <p className="line-clamp-1 text-sm">{item.description}</p>
        </div>
      </Link>
    </div>
  );
}
