import { JobApplicationForm } from "./components/JobApplicationForm";

export default function NewApplicationPage({}) {

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex w-[95%] flex-col gap-3 p-1 lg:w-[80%] md:p-5 ">
              <JobApplicationForm />
          </div>
    </div>
  );
}
