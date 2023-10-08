import { GithubIcon } from "lucide-react";
import { SearchGithubprojects } from "./SearchGithubprojects";
import { TheFormModal } from "@/components/modal/TheFormModal";
import { TProjectInputType } from "@/routes/api/helpers/prisma/projects";
import { TUserProfileInputType } from "../../../components/profile/api";


interface AddFromGithubProps {
modal_id: string;
project: TProjectInputType;
setProject: React.Dispatch<React.SetStateAction<TProjectInputType>>;
profile:TUserProfileInputType
}

export function AddFromGithub({modal_id,profile,project,setProject}:AddFromGithubProps){
return (
  <TheFormModal
    id={modal_id}
    close_on_bg_click={true}
    label={
      <span className="btn btn-outline flex gap-2 ">
        <h3> add from github</h3>
        <GithubIcon className="h-6 w-6" />
      </span>
    }
  >
    <SearchGithubprojects
      project={project}
      github_username={profile?.github_username ?? ""}
      setProject={setProject}
      modal_id={modal_id}
    />
  </TheFormModal>
);
}
