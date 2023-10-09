import { PageProps } from "rakkasjs";
import { ExperienceForm } from "./components/ExperienceForm";

export default function NewExperiencePage({}:PageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
      <div className="flex h-full w-full items-center justify-center">
        <ExperienceForm />
      </div>
    </div>
  );
}
