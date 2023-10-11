import { JobApplications } from "./components/JobApplications";

export default function ApplicationsPage({}) {
return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-2 relative">  
          <div className="flex w-[95%] flex-col gap-3 p-1 lg:w-[80%] md:p-5 ">
                <JobApplications/>
        </div>
    </div>
  );
}
