import { EducationForm } from "./components/EducationForm";


export default function NewEducationPage({}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">

      <div className="flex w-full h-full items-center justify-center">
        <EducationForm />
      </div>
    </div>
  );
}
