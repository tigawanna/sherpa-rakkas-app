import { JobApplicationForm } from "./components/JobApplicationForm";

export default function NewApplicationPage({}) {

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex w-[95%] flex-col gap-3 p-1 md:w-[80%] md:p-5 lg:w-[60%]">
              <JobApplicationForm />
          </div>
    </div>
  );
}
